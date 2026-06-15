$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

$FrameSize = 362
$RepoRoot = Split-Path -Parent $PSScriptRoot
$WeaponRoot = Join-Path $RepoRoot 'assest\weapons'
$ActionRoot = Join-Path $RepoRoot 'assest\weapon_actions'
$SourceRoot = Join-Path $RepoRoot 'assest\references\image2_weapon_action_sources'
$BackupRoot = Join-Path $RepoRoot 'assest\references\weapon_actions_backup_before_image2_regen'

if (!(Test-Path $BackupRoot)) {
  Copy-Item -LiteralPath $ActionRoot -Destination $BackupRoot -Recurse -Force
}

function New-FrameCanvas {
  $bmp = [System.Drawing.Bitmap]::new($FrameSize, $FrameSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  return $bmp
}

function Load-Bitmap {
  param([string]$Path)
  $stream = [System.IO.File]::OpenRead($Path)
  try {
    $img = [System.Drawing.Image]::FromStream($stream)
    $bmp = [System.Drawing.Bitmap]::new($img.Width, $img.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
    $g.Dispose()
    $img.Dispose()
    return $bmp
  } finally {
    $stream.Dispose()
  }
}

function Trim-Bitmap {
  param(
    [System.Drawing.Bitmap]$Source,
    [int]$AlphaThreshold = 8
  )
  $minX = $Source.Width
  $minY = $Source.Height
  $maxX = -1
  $maxY = -1
  for ($y = 0; $y -lt $Source.Height; $y++) {
    for ($x = 0; $x -lt $Source.Width; $x++) {
      if ($Source.GetPixel($x, $y).A -gt $AlphaThreshold) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($maxX -lt $minX -or $maxY -lt $minY) {
    return [System.Drawing.Bitmap]::new(1, 1, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  }
  $pad = 4
  $minX = [Math]::Max(0, $minX - $pad)
  $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($Source.Width - 1, $maxX + $pad)
  $maxY = [Math]::Min($Source.Height - 1, $maxY + $pad)
  $rect = [System.Drawing.Rectangle]::new($minX, $minY, $maxX - $minX + 1, $maxY - $minY + 1)
  return $Source.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Remove-ChromaKey {
  param(
    [System.Drawing.Bitmap]$Source,
    [ValidateSet('green','magenta','none')] [string]$Key
  )
  $out = [System.Drawing.Bitmap]::new($Source.Width, $Source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $Source.Height; $y++) {
    for ($x = 0; $x -lt $Source.Width; $x++) {
      $c = $Source.GetPixel($x, $y)
      $isKey = $false
      if ($Key -eq 'green') {
        $isKey = ($c.G -gt 135 -and $c.R -lt 120 -and $c.B -lt 120)
      } elseif ($Key -eq 'magenta') {
        $isKey = ($c.R -gt 145 -and $c.B -gt 145 -and $c.G -lt 115)
      }
      if ($isKey) {
        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      } else {
        if ($Key -eq 'green' -and $c.G -gt ($c.R + 55) -and $c.G -gt ($c.B + 55)) {
          $maxRB = [Math]::Max($c.R, $c.B)
          $newG = [int][Math]::Min(255, [Math]::Min([int]$c.G, [int]$maxRB + 42))
          $c = [System.Drawing.Color]::FromArgb($c.A, $c.R, $newG, $c.B)
        }
        if ($Key -eq 'magenta' -and $c.R -gt ($c.G + 55) -and $c.B -gt ($c.G + 55)) {
          $newR = [int][Math]::Min(255, [Math]::Min([int]$c.R, [int]$c.G + 65))
          $newB = [int][Math]::Min(255, [Math]::Min([int]$c.B, [int]$c.G + 65))
          $c = [System.Drawing.Color]::FromArgb($c.A, $newR, $c.G, $newB)
        }
        $out.SetPixel($x, $y, $c)
      }
    }
  }
  return $out
}

function New-Graphics {
  param([System.Drawing.Bitmap]$Bitmap)
  $g = [System.Drawing.Graphics]::FromImage($Bitmap)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  return $g
}

function Draw-BitmapFit {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Bitmap]$Bitmap,
    [double]$CenterX,
    [double]$CenterY,
    [double]$MaxW,
    [double]$MaxH,
    [double]$Angle = 0,
    [double]$Scale = 1.0,
    [double]$Alpha = 1.0
  )
  $ratio = [Math]::Min($MaxW / $Bitmap.Width, $MaxH / $Bitmap.Height) * $Scale
  $drawW = [Math]::Max(1, [int]($Bitmap.Width * $ratio))
  $drawH = [Math]::Max(1, [int]($Bitmap.Height * $ratio))
  $state = $Graphics.Save()
  $Graphics.TranslateTransform([float]$CenterX, [float]$CenterY)
  $Graphics.RotateTransform([float]$Angle)
  $dest = [System.Drawing.Rectangle]::new([int](-$drawW / 2), [int](-$drawH / 2), $drawW, $drawH)
  if ($Alpha -lt 0.999) {
    $attrs = [System.Drawing.Imaging.ImageAttributes]::new()
    $matrix = [System.Drawing.Imaging.ColorMatrix]::new()
    $matrix.Matrix33 = [float]$Alpha
    $attrs.SetColorMatrix($matrix)
    $Graphics.DrawImage($Bitmap, $dest, 0, 0, $Bitmap.Width, $Bitmap.Height, [System.Drawing.GraphicsUnit]::Pixel, $attrs)
    $attrs.Dispose()
  } else {
    $Graphics.DrawImage($Bitmap, $dest)
  }
  $Graphics.Restore($state)
}

function New-Pen {
  param(
    [System.Drawing.Color]$Color,
    [double]$Width
  )
  $pen = [System.Drawing.Pen]::new($Color, [float]$Width)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  return $pen
}

function Color-A {
  param([int]$A, [int]$R, [int]$G, [int]$B)
  return [System.Drawing.Color]::FromArgb($A, $R, $G, $B)
}

function Save-Frame {
  param(
    [string]$WeaponId,
    [string]$Action,
    [int]$Index,
    [System.Drawing.Bitmap]$Bitmap
  )
  $dir = Join-Path $ActionRoot (Join-Path $WeaponId $Action)
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $path = Join-Path $dir ('frame_{0:D2}.png' -f $Index)
  $Bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function Get-SourceCell {
  param(
    [string]$SourcePath,
    [int]$Cols,
    [int]$Index,
    [ValidateSet('green','magenta','none')] [string]$Key = 'green',
    [int]$Row = 0,
    [int]$Rows = 1
  )
  $src = Load-Bitmap $SourcePath
  try {
    $x0 = [int][Math]::Floor(($src.Width * $Index) / $Cols)
    $x1 = [int][Math]::Floor(($src.Width * ($Index + 1)) / $Cols)
    $y0 = [int][Math]::Floor(($src.Height * $Row) / $Rows)
    $y1 = [int][Math]::Floor(($src.Height * ($Row + 1)) / $Rows)
    $w = [Math]::Max(1, $x1 - $x0)
    $h = [Math]::Max(1, $y1 - $y0)
    $cell = [System.Drawing.Bitmap]::new($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = New-Graphics $cell
    $srcRect = [System.Drawing.Rectangle]::new($x0, $y0, $w, $h)
    $dstRect = [System.Drawing.Rectangle]::new(0, 0, $w, $h)
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $clean = Remove-ChromaKey $cell $Key
    $cell.Dispose()
    $trim = Trim-Bitmap $clean
    $clean.Dispose()
    return $trim
  } finally {
    $src.Dispose()
  }
}

function Save-SourceAction {
  param(
    [string]$WeaponId,
    [string]$Action,
    [string]$SourceFile,
    [int]$Cols,
    [int]$Count,
    [ValidateSet('green','magenta','none')] [string]$Key = 'green',
    [int]$Row = 0,
    [int]$Rows = 1,
    [int[]]$Indices = $null,
    [int]$MaxSize = 334
  )
  $sourcePath = Join-Path $SourceRoot $SourceFile
  for ($i = 0; $i -lt $Count; $i++) {
    $cellIndex = if ($Indices) { $Indices[$i] } else { $i }
    $cell = Get-SourceCell $sourcePath $Cols $cellIndex $Key $Row $Rows
    $canvas = New-FrameCanvas
    $g = New-Graphics $canvas
    Draw-BitmapFit $g $cell ($FrameSize / 2) ($FrameSize / 2) $MaxSize $MaxSize
    $g.Dispose()
    Save-Frame $WeaponId $Action $i $canvas
    $canvas.Dispose()
    $cell.Dispose()
  }
}

$weaponFiles = @{
  bouncing_slipper = 'Bouncing Slipper.png'
  divine_slipper = 'Divine Slipper.png'
  boomerang_cleaver = 'Boomerang Cleaver.png'
  meat_grinder = 'Meat Grinder.png'
  throwing_chopsticks = 'Throwing Chopsticks.png'
  holy_toast = 'Holy Toast.png'
  cross = 'Cross.png'
  rolling_pin = 'Rolling Pin.png'
  excalibur_ladle = 'Excalibur Ladle.png'
  spinning_ladle = 'Spinning Ladle.png'
  hot_sauce_bottle = 'Hot Sauce Bottle.png'
  infinite_hot_pot = 'Infinite Hot Pot.png'
}

$weapons = @{}
foreach ($entry in $weaponFiles.GetEnumerator()) {
  $loaded = Load-Bitmap (Join-Path $WeaponRoot $entry.Value)
  $trim = Trim-Bitmap $loaded
  $loaded.Dispose()
  $weapons[$entry.Key] = $trim
}

function Draw-Trail {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Color]$Color,
    [int]$Frame,
    [int]$Count,
    [double]$Angle = 0
  )
  $phase = ($Frame + 1) / [double]$Count
  $state = $Graphics.Save()
  $Graphics.TranslateTransform($FrameSize / 2, $FrameSize / 2)
  $Graphics.RotateTransform([float]$Angle)
  for ($j = 0; $j -lt 4; $j++) {
    $alpha = [int](95 - $j * 18)
    $pen = New-Pen (Color-A $alpha $Color.R $Color.G $Color.B) (8 - $j)
    $offset = -120 - $j * 18 + $phase * 18
    $Graphics.DrawBezier($pen, $offset, 20 - $j * 8, -55, -18 - $j * 2, 28, -12 + $j * 2, 104, 12 + $j * 3)
    $pen.Dispose()
  }
  $Graphics.Restore($state)
}

function Draw-ImpactBurst {
  param(
    [System.Drawing.Graphics]$Graphics,
    [int]$Frame,
    [int]$Count,
    [System.Drawing.Color]$Color1,
    [System.Drawing.Color]$Color2
  )
  $p = ($Frame + 1) / [double]$Count
  $center = $FrameSize / 2
  $radius = 34 + 96 * $p
  $ringPen = New-Pen (Color-A ([int](150 * (1 - $p * 0.55))) $Color1.R $Color1.G $Color1.B) (12 - 5 * $p)
  $Graphics.DrawEllipse($ringPen, $center - $radius, $center - $radius * 0.62, $radius * 2, $radius * 1.24)
  $ringPen.Dispose()
  for ($i = 0; $i -lt 14; $i++) {
    $a = (-28 + $i * 15 + $Frame * 9) * [Math]::PI / 180
    $inner = 26 + 24 * $p
    $outer = 72 + 78 * $p + (($i % 3) * 7)
    $x1 = $center + [Math]::Cos($a) * $inner
    $y1 = $center + [Math]::Sin($a) * $inner * 0.72
    $x2 = $center + [Math]::Cos($a) * $outer
    $y2 = $center + [Math]::Sin($a) * $outer * 0.72
    $c = if (($i % 2) -eq 0) { $Color1 } else { $Color2 }
    $pen = New-Pen (Color-A ([int](210 * (1 - $p * 0.35))) $c.R $c.G $c.B) (3 + ($i % 3))
    $Graphics.DrawLine($pen, [float]$x1, [float]$y1, [float]$x2, [float]$y2)
    $pen.Dispose()
  }
}

function Save-ProjectileSpin {
  param(
    [string]$WeaponId,
    [string]$Action,
    [string]$BaseId,
    [int]$Count,
    [int[]]$Angles,
    [System.Drawing.Color]$TrailColor,
    [double]$ObjectScale = 1.0,
    [bool]$ReturnTrail = $false
  )
  for ($i = 0; $i -lt $Count; $i++) {
    $canvas = New-FrameCanvas
    $g = New-Graphics $canvas
    $trailAngle = if ($ReturnTrail) { 180 } else { 0 }
    Draw-Trail $g $TrailColor $i $Count $trailAngle
    $angle = $Angles[$i % $Angles.Count]
    Draw-BitmapFit $g $weapons[$BaseId] ($FrameSize / 2) ($FrameSize / 2) 286 286 $angle $ObjectScale
    for ($s = 0; $s -lt 5; $s++) {
      $brush = [System.Drawing.SolidBrush]::new((Color-A 165 255 214 96))
      $x = 84 + (($s * 47 + $i * 23) % 205)
      $y = 88 + (($s * 31 + $i * 17) % 168)
      $GraphicsPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
      $GraphicsPath.AddEllipse($x, $y, 4 + ($s % 3), 4 + ($s % 3))
      $g.FillPath($brush, $GraphicsPath)
      $GraphicsPath.Dispose()
      $brush.Dispose()
    }
    $g.Dispose()
    Save-Frame $WeaponId $Action $i $canvas
    $canvas.Dispose()
  }
}

function Save-ImpactAction {
  param(
    [string]$WeaponId,
    [string]$BaseId,
    [int]$Count,
    [System.Drawing.Color]$Color1,
    [System.Drawing.Color]$Color2
  )
  for ($i = 0; $i -lt $Count; $i++) {
    $canvas = New-FrameCanvas
    $g = New-Graphics $canvas
    Draw-ImpactBurst $g $i $Count $Color1 $Color2
    $scale = 0.92 - $i * 0.055
    $alpha = 0.9 - $i * 0.09
    Draw-BitmapFit $g $weapons[$BaseId] ($FrameSize / 2) ($FrameSize / 2) 230 230 (-12 + $i * 16) $scale $alpha
    $g.Dispose()
    Save-Frame $WeaponId 'impact' $i $canvas
    $canvas.Dispose()
  }
}

function Save-SlashWithOverlay {
  param(
    [string]$WeaponId,
    [string]$Action,
    [string]$OverlayBaseId,
    [double]$BaseAngleOffset = 0,
    [double]$BaseMax = 220
  )
  $sourcePath = Join-Path $SourceRoot 'slash_energy_strip_source.png'
  for ($i = 0; $i -lt 6; $i++) {
    $cell = Get-SourceCell $sourcePath 6 $i 'green'
    $canvas = New-FrameCanvas
    $g = New-Graphics $canvas
    Draw-BitmapFit $g $cell ($FrameSize / 2) ($FrameSize / 2) 342 342
    if ($OverlayBaseId) {
      $angle = -34 + $i * 18 + $BaseAngleOffset
      Draw-BitmapFit $g $weapons[$OverlayBaseId] ($FrameSize / 2) ($FrameSize / 2 + 12) $BaseMax $BaseMax $angle 0.86 0.94
    }
    $g.Dispose()
    Save-Frame $WeaponId $Action $i $canvas
    $canvas.Dispose()
    $cell.Dispose()
  }
}

function Save-OrbitFromBase {
  param(
    [string]$WeaponId,
    [string]$BaseId,
    [System.Drawing.Color]$ArcColor,
    [System.Drawing.Color]$SparkColor
  )
  for ($i = 0; $i -lt 6; $i++) {
    $canvas = New-FrameCanvas
    $g = New-Graphics $canvas
    for ($j = 0; $j -lt 3; $j++) {
      $pen = New-Pen (Color-A (95 - $j * 20) $ArcColor.R $ArcColor.G $ArcColor.B) (12 - $j * 3)
      $rect = [System.Drawing.RectangleF]::new(46 + $j * 8, 62 + $j * 4, 270 - $j * 16, 236 - $j * 8)
      $g.DrawArc($pen, $rect, -160 + $i * 34 + $j * 18, 275)
      $pen.Dispose()
    }
    $angle = $i * 60
    Draw-BitmapFit $g $weapons[$BaseId] ($FrameSize / 2) ($FrameSize / 2) 252 252 $angle 1.0
    for ($s = 0; $s -lt 6; $s++) {
      $a = ($i * 31 + $s * 59) * [Math]::PI / 180
      $x = $FrameSize / 2 + [Math]::Cos($a) * (126 + ($s % 2) * 14)
      $y = $FrameSize / 2 + [Math]::Sin($a) * (104 + ($s % 3) * 10)
      $brush = [System.Drawing.SolidBrush]::new((Color-A 180 $SparkColor.R $SparkColor.G $SparkColor.B))
      $g.FillEllipse($brush, [float]($x - 4), [float]($y - 4), 8, 8)
      $brush.Dispose()
    }
    $g.Dispose()
    Save-Frame $WeaponId 'loop' $i $canvas
    $canvas.Dispose()
  }
}

function Save-ToastSplash {
  for ($i = 0; $i -lt 4; $i++) {
    $canvas = New-FrameCanvas
    $g = New-Graphics $canvas
    $gold = Color-A 220 255 204 80
    $orange = Color-A 210 225 83 33
    Draw-ImpactBurst $g $i 4 $gold $orange
    $p = ($i + 1) / 4.0
    $center = $FrameSize / 2
    $baseBrush = [System.Drawing.SolidBrush]::new((Color-A ([int](130 * (1 - $p * 0.25))) 255 210 92))
    $g.FillEllipse($baseBrush, [float]($center - 88 - $i * 4), [float]($center - 26 - $i * 2), [float](176 + $i * 8), [float](52 + $i * 5))
    $baseBrush.Dispose()
    for ($w = 0; $w -lt 3; $w++) {
      $pen = New-Pen (Color-A (190 - $w * 36) 255 236 134) (7 - $w)
      $g.DrawArc($pen, [System.Drawing.RectangleF]::new(54 + $w * 10, 120 + $w * 8, 254 - $w * 20, 128 - $w * 12), 188 + $i * 8, 164)
      $pen.Dispose()
    }
    Draw-BitmapFit $g $weapons['holy_toast'] ($center - 6) ($center - 4) 176 176 (-16 + $i * 24) (0.82 - $i * 0.06) (0.72 - $i * 0.08)
    for ($c = 0; $c -lt 18; $c++) {
      $a = ($c * 23 + $i * 19) * [Math]::PI / 180
      $r = 52 + (($c * 17 + $i * 23) % 132)
      $x = $FrameSize / 2 + [Math]::Cos($a) * $r
      $y = $FrameSize / 2 + [Math]::Sin($a) * $r * 0.62
      $brush = [System.Drawing.SolidBrush]::new((Color-A 225 236 144 54))
      $g.FillEllipse($brush, [float]($x - 7), [float]($y - 4), 14, 8)
      $brush.Dispose()
    }
    $g.Dispose()
    Save-Frame 'holy_toast' 'splash' $i $canvas
    $canvas.Dispose()
  }
}

# Image-2 source strips.
Save-SourceAction 'cross' 'fly' 'cross_rotation_strip_source.png' 6 6 'green' 0 1 $null 336
Save-SourceAction 'cross' 'return' 'cross_rotation_strip_source.png' 6 4 'green' 0 1 @(5, 4, 3, 2) 336
Save-SourceAction 'whip' 'slash' 'slash_energy_strip_source.png' 6 6 'green' 0 1 $null 348
Save-SourceAction 'garlic_breath' 'loop' 'garlic_aura_loop_source.png' 6 6 'magenta' 0 1 $null 342
Save-SourceAction 'spinning_ladle' 'loop' 'spinning_ladle_loop_source.png' 6 6 'green' 0 1 $null 342
Save-SourceAction 'hot_sauce_bottle' 'spray' 'hot_sauce_spray_burn_source.png' 6 6 'green' 0 2 $null 342
Save-SourceAction 'hot_sauce_bottle' 'burn' 'hot_sauce_spray_burn_source.png' 4 4 'green' 1 2 $null 340
Save-SourceAction 'infinite_hot_pot' 'spray' 'hot_sauce_spray_burn_source.png' 6 6 'green' 0 2 @(1, 2, 3, 4, 5, 0) 346
Save-SourceAction 'infinite_hot_pot' 'burn' 'hot_sauce_spray_burn_source.png' 4 4 'green' 1 2 @(0, 1, 2, 3) 342
Save-SourceAction 'infinite_hot_pot' 'splash' 'hot_sauce_spray_burn_source.png' 4 4 'green' 1 2 @(1, 2, 3, 0) 342
Save-SourceAction 'thermal_bag' 'shield' 'functional_thermal_bag_shield_source.png' 6 6 'magenta' 0 1 $null 352
Save-SourceAction 'freezer_gate' 'ray' 'functional_freezer_gate_ray_source.png' 6 6 'magenta' 0 1 $null 352
Save-SourceAction 'service_bell' 'pulse' 'functional_service_bell_pulse_source.png' 6 6 'green' 0 1 $null 352
Save-SourceAction 'michelin_cloak' 'shield' 'functional_michelin_cloak_revive_source.png' 6 6 'magenta' 0 1 $null 352
Save-SourceAction 'michelin_cloak' 'revive' 'functional_michelin_cloak_revive_source.png' 6 6 'magenta' 0 1 $null 352
Save-SourceAction 'infinite_buffet' 'ray' 'functional_infinite_buffet_ray_source.png' 6 6 'magenta' 0 1 $null 352
Save-SourceAction 'gorgeous_moonboba' 'pulse' 'functional_gorgeous_moonboba_pulse_source.png' 6 6 'green' 0 1 $null 352

# Projectile and impact actions based on original weapon icons.
Save-ProjectileSpin 'bouncing_slipper' 'fly' 'bouncing_slipper' 4 @(-18, 22, 62, 104) (Color-A 255 224 78 40) 0.98
Save-ImpactAction 'bouncing_slipper' 'bouncing_slipper' 4 (Color-A 255 240 77 44) (Color-A 255 255 199 66)

Save-ProjectileSpin 'divine_slipper' 'fly' 'divine_slipper' 4 @(-24, 18, 62, 100) (Color-A 255 255 215 92) 1.02
Save-ImpactAction 'divine_slipper' 'divine_slipper' 4 (Color-A 255 255 226 118) (Color-A 255 250 110 56)

Save-ProjectileSpin 'boomerang_cleaver' 'fly' 'boomerang_cleaver' 6 @(-35, 25, 85, 145, 205, 265) (Color-A 255 207 48 38) 0.94
Save-ProjectileSpin 'boomerang_cleaver' 'return' 'boomerang_cleaver' 4 @(235, 175, 115, 55) (Color-A 255 255 158 74) 0.94 $true
Save-ImpactAction 'boomerang_cleaver' 'boomerang_cleaver' 4 (Color-A 255 213 49 42) (Color-A 255 255 190 72)

Save-ProjectileSpin 'meat_grinder' 'fly' 'meat_grinder' 6 @(-18, 42, 102, 162, 222, 282) (Color-A 255 201 43 37) 0.9
Save-ProjectileSpin 'meat_grinder' 'return' 'meat_grinder' 4 @(210, 150, 90, 30) (Color-A 255 254 118 59) 0.9 $true
Save-ImpactAction 'meat_grinder' 'meat_grinder' 4 (Color-A 255 191 35 33) (Color-A 255 255 158 80)

Save-ProjectileSpin 'throwing_chopsticks' 'fly' 'throwing_chopsticks' 4 @(-10, 4, 18, 32) (Color-A 255 255 182 54) 1.08
Save-ImpactAction 'throwing_chopsticks' 'throwing_chopsticks' 4 (Color-A 255 205 38 34) (Color-A 255 255 215 86)

Save-ProjectileSpin 'holy_toast' 'lob' 'holy_toast' 4 @(-18, 18, 52, 88) (Color-A 255 255 218 94) 0.94
Save-ToastSplash

Save-ImpactAction 'cross' 'cross' 4 (Color-A 255 255 222 96) (Color-A 255 206 40 42)

# Sweep/orbit variants.
Save-SlashWithOverlay 'rolling_pin' 'slash' 'rolling_pin' -8 236
Save-SlashWithOverlay 'excalibur_ladle' 'slash' 'excalibur_ladle' 12 242
Save-OrbitFromBase 'excalibur_ladle' 'excalibur_ladle' (Color-A 255 255 209 92) (Color-A 255 255 245 190)

foreach ($bmp in $weapons.Values) {
  $bmp.Dispose()
}

Write-Output "Regenerated weapon action frames under $ActionRoot"
