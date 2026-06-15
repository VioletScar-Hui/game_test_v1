$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $projectRoot "assest\characters"
$outputRoot = Join-Path $sourceDir "antonio"
$canvasSize = 362
$bottomPadding = 18

$actions = @(
  @{ Name = "idle";  Source = "Antonio Spicy_idle.png";   Mode = "horizontal"; Cols = 6; Rows = 1 },
  @{ Name = "hit";   Source = "Antonio Spicy_hit.png";    Mode = "horizontal"; Cols = 6; Rows = 1 },
  @{ Name = "skill"; Source = "Antonio Spicy_skill1.png"; Mode = "horizontal"; Cols = 6; Rows = 1 },
  @{ Name = "death"; Source = "Antonio Spicy_death.png";  Mode = "horizontal"; Cols = 6; Rows = 1 },
  @{ Name = "walk";  Source = "Antonio Spicy_walk.png";   Mode = "directions"; Cols = 6; Rows = 8; Directions = @{ up = 0; down = 1; right = 3 } },
  @{ Name = "run";   Source = "Antonio Spicy_run.png";    Mode = "directions"; Cols = 6; Rows = 7; Directions = @{ up = 0; down = 1; right = 3 } }
)

function Remove-Background {
  param([System.Drawing.Bitmap]$Bitmap)

  $rect = [System.Drawing.Rectangle]::new(0, 0, $Bitmap.Width, $Bitmap.Height)
  $data = $Bitmap.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try {
    $stride = [Math]::Abs($data.Stride)
    $bytes = New-Object byte[] ($stride * $Bitmap.Height)
    [Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

    $w = $Bitmap.Width
    $h = $Bitmap.Height
    $visited = New-Object byte[] ($w * $h)
    $stack = [System.Collections.Generic.Stack[int]]::new()

    for ($x = 0; $x -lt $w; $x++) {
      $stack.Push($x)
      $stack.Push((($h - 1) * $w) + $x)
    }
    for ($y = 0; $y -lt $h; $y++) {
      $stack.Push($y * $w)
      $stack.Push(($y * $w) + ($w - 1))
    }

    while ($stack.Count -gt 0) {
      $idx = $stack.Pop()
      if ($visited[$idx] -ne 0) { continue }
      $visited[$idx] = 1
      $x = $idx % $w
      $y = [Math]::Floor($idx / $w)
      $offset = ($y * $stride) + ($x * 4)
      $b = [int]$bytes[$offset]
      $g = [int]$bytes[$offset + 1]
      $r = [int]$bytes[$offset + 2]
      $a = [int]$bytes[$offset + 3]
      $maxC = [Math]::Max($r, [Math]::Max($g, $b))
      $minC = [Math]::Min($r, [Math]::Min($g, $b))
      $brightness = ($r + $g + $b) / 3

      if ($brightness -ge 165 -and ($maxC - $minC) -le 56 -and $a -gt 96) {
        $bytes[$offset] = 0
        $bytes[$offset + 1] = 0
        $bytes[$offset + 2] = 0
        $bytes[$offset + 3] = 0

        if ($x -gt 0) { $stack.Push($idx - 1) }
        if ($x -lt ($w - 1)) { $stack.Push($idx + 1) }
        if ($y -gt 0) { $stack.Push($idx - $w) }
        if ($y -lt ($h - 1)) { $stack.Push($idx + $w) }
      }
    }

    for ($y = 0; $y -lt $h; $y++) {
      for ($x = 0; $x -lt $w; $x++) {
        $offset = ($y * $stride) + ($x * 4)
        if ($bytes[$offset + 3] -eq 0) { continue }

        $hasTransparentNeighbor = $false
        if ($x -gt 0 -and $bytes[$offset - 1] -eq 0) { $hasTransparentNeighbor = $true }
        if ($x -lt ($w - 1) -and $bytes[$offset + 7] -eq 0) { $hasTransparentNeighbor = $true }
        if ($y -gt 0 -and $bytes[$offset - $stride + 3] -eq 0) { $hasTransparentNeighbor = $true }
        if ($y -lt ($h - 1) -and $bytes[$offset + $stride + 3] -eq 0) { $hasTransparentNeighbor = $true }
        if (-not $hasTransparentNeighbor) { continue }

        $b = [int]$bytes[$offset]
        $g = [int]$bytes[$offset + 1]
        $r = [int]$bytes[$offset + 2]
        $maxC = [Math]::Max($r, [Math]::Max($g, $b))
        $minC = [Math]::Min($r, [Math]::Min($g, $b))
        if ($r -ge 165 -and $g -ge 165 -and $b -ge 165 -and ($maxC - $minC) -lt 56) {
          $whiteness = ($r + $g + $b) / 3
          $fade = 1 - (($whiteness - 165) / 90)
          if ($fade -lt 0) { $fade = 0 }
          if ($fade -gt 1) { $fade = 1 }
          $alpha = [Math]::Round($bytes[$offset + 3] * $fade)
          $bytes[$offset + 3] = [byte]$alpha
          if ($alpha -eq 0) {
            $bytes[$offset] = 0
            $bytes[$offset + 1] = 0
            $bytes[$offset + 2] = 0
          }
        }
      }
    }

    [Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
  }
  finally {
    $Bitmap.UnlockBits($data)
  }
}

function Get-AlphaBytes {
  param([System.Drawing.Bitmap]$Bitmap)

  $rect = [System.Drawing.Rectangle]::new(0, 0, $Bitmap.Width, $Bitmap.Height)
  $data = $Bitmap.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try {
    $stride = [Math]::Abs($data.Stride)
    $bytes = New-Object byte[] ($stride * $Bitmap.Height)
    [Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
    return @{ Bytes = $bytes; Stride = $stride; Width = $Bitmap.Width; Height = $Bitmap.Height }
  }
  finally {
    $Bitmap.UnlockBits($data)
  }
}

function New-Bands {
  param(
    [int[]]$Counts,
    [int]$Threshold,
    [int]$MergeGap
  )

  $bands = @()
  $start = -1
  $lastActive = -1

  for ($i = 0; $i -lt $Counts.Length; $i++) {
    if ($Counts[$i] -ge $Threshold) {
      if ($start -lt 0) { $start = $i }
      $lastActive = $i
    } elseif ($start -ge 0 -and ($i - $lastActive) -gt $MergeGap) {
      $bands += [pscustomobject]@{ Start = $start; End = $lastActive }
      $start = -1
      $lastActive = -1
    }
  }

  if ($start -ge 0) {
    $bands += [pscustomobject]@{ Start = $start; End = $lastActive }
  }

  return $bands
}

function Get-FrameBoxes {
  param([System.Drawing.Bitmap]$Bitmap)

  $alpha = Get-AlphaBytes -Bitmap $Bitmap
  $bytes = $alpha.Bytes
  $stride = $alpha.Stride
  $w = $alpha.Width
  $h = $alpha.Height

  $yCounts = New-Object int[] $h
  for ($y = 0; $y -lt $h; $y++) {
    $count = 0
    for ($x = 0; $x -lt $w; $x++) {
      $offset = ($y * $stride) + ($x * 4)
      $a = [int]$bytes[$offset + 3]
      if ($a -gt 24) {
        $b = [int]$bytes[$offset]
        $g = [int]$bytes[$offset + 1]
        $r = [int]$bytes[$offset + 2]
        $maxC = [Math]::Max($r, [Math]::Max($g, $b))
        $minC = [Math]::Min($r, [Math]::Min($g, $b))
        $brightness = ($r + $g + $b) / 3
        if (-not ($brightness -ge 165 -and ($maxC - $minC) -le 56)) { $count++ }
      }
    }
    $yCounts[$y] = $count
  }

  $rowBands = New-Bands -Counts $yCounts -Threshold 18 -MergeGap 18
  $rows = @()

  foreach ($row in $rowBands) {
    $xCounts = New-Object int[] $w
    for ($x = 0; $x -lt $w; $x++) {
      $count = 0
      for ($y = $row.Start; $y -le $row.End; $y++) {
        $offset = ($y * $stride) + ($x * 4)
        $a = [int]$bytes[$offset + 3]
        if ($a -gt 24) {
          $b = [int]$bytes[$offset]
          $g = [int]$bytes[$offset + 1]
          $r = [int]$bytes[$offset + 2]
          $maxC = [Math]::Max($r, [Math]::Max($g, $b))
          $minC = [Math]::Min($r, [Math]::Min($g, $b))
          $brightness = ($r + $g + $b) / 3
          if (-not ($brightness -ge 165 -and ($maxC - $minC) -le 56)) { $count++ }
        }
      }
      $xCounts[$x] = $count
    }

    $xBands = New-Bands -Counts $xCounts -Threshold 6 -MergeGap 12
    $boxes = @()

    foreach ($band in $xBands) {
      $minX = $w
      $minY = $h
      $maxX = -1
      $maxY = -1

      for ($y = $row.Start; $y -le $row.End; $y++) {
        for ($x = $band.Start; $x -le $band.End; $x++) {
          $offset = ($y * $stride) + ($x * 4)
          $a = [int]$bytes[$offset + 3]
          if ($a -gt 24) {
            $b = [int]$bytes[$offset]
            $g = [int]$bytes[$offset + 1]
            $r = [int]$bytes[$offset + 2]
            $maxC = [Math]::Max($r, [Math]::Max($g, $b))
            $minC = [Math]::Min($r, [Math]::Min($g, $b))
            $brightness = ($r + $g + $b) / 3
          }
          if ($a -gt 24 -and -not ($brightness -ge 165 -and ($maxC - $minC) -le 56)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
          }
        }
      }

      $width = $maxX - $minX + 1
      $height = $maxY - $minY + 1
      if ($width -ge 42 -and $height -ge 42) {
        $boxes += [pscustomobject]@{ X = $minX; Y = $minY; Width = $width; Height = $height }
      }
    }

    if ($boxes.Count -gt 0) {
      $rows += ,$boxes
    }
  }

  return ,$rows
}

function Get-RowBandsForLayout {
  param([System.Drawing.Bitmap]$Bitmap)

  $alpha = Get-AlphaBytes -Bitmap $Bitmap
  $bytes = $alpha.Bytes
  $stride = $alpha.Stride
  $w = $alpha.Width
  $h = $alpha.Height

  $yCounts = New-Object int[] $h
  for ($y = 0; $y -lt $h; $y++) {
    $count = 0
    for ($x = 0; $x -lt $w; $x++) {
      $offset = ($y * $stride) + ($x * 4)
      $a = [int]$bytes[$offset + 3]
      if ($a -le 24) { continue }
      $b = [int]$bytes[$offset]
      $g = [int]$bytes[$offset + 1]
      $r = [int]$bytes[$offset + 2]
      $maxC = [Math]::Max($r, [Math]::Max($g, $b))
      $minC = [Math]::Min($r, [Math]::Min($g, $b))
      $brightness = ($r + $g + $b) / 3
      if (-not ($brightness -ge 165 -and ($maxC - $minC) -le 56)) { $count++ }
    }
    $yCounts[$y] = $count
  }

  return New-Bands -Counts $yCounts -Threshold 18 -MergeGap 18
}

function Get-CellBox {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [int]$Cols,
    [int]$Col,
    [int]$YStart,
    [int]$YEnd
  )

  $alpha = Get-AlphaBytes -Bitmap $Bitmap
  $bytes = $alpha.Bytes
  $stride = $alpha.Stride
  $w = $alpha.Width
  $h = $alpha.Height
  $x0 = [Math]::Round($Col * $w / $Cols)
  $x1 = [Math]::Round(($Col + 1) * $w / $Cols) - 1
  $y0 = [Math]::Max(0, $YStart)
  $y1 = [Math]::Min($h - 1, $YEnd)

  $minX = $w
  $minY = $h
  $maxX = -1
  $maxY = -1

  for ($y = $y0; $y -le $y1; $y++) {
    for ($x = $x0; $x -le $x1; $x++) {
      $offset = ($y * $stride) + ($x * 4)
      $a = [int]$bytes[$offset + 3]
      if ($a -le 24) { continue }

      $b = [int]$bytes[$offset]
      $g = [int]$bytes[$offset + 1]
      $r = [int]$bytes[$offset + 2]
      $maxC = [Math]::Max($r, [Math]::Max($g, $b))
      $minC = [Math]::Min($r, [Math]::Min($g, $b))
      $brightness = ($r + $g + $b) / 3
      if ($brightness -ge 165 -and ($maxC - $minC) -le 56) { continue }

      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }

  if ($maxX -lt $minX -or $maxY -lt $minY) {
    return [pscustomobject]@{ X = $x0; Y = $y0; Width = ($x1 - $x0 + 1); Height = ($y1 - $y0 + 1) }
  }

  $pad = 6
  $minX = [Math]::Max($x0, $minX - $pad)
  $minY = [Math]::Max($y0, $minY - $pad)
  $maxX = [Math]::Min($x1, $maxX + $pad)
  $maxY = [Math]::Min($y1, $maxY + $pad)

  return [pscustomobject]@{ X = $minX; Y = $minY; Width = ($maxX - $minX + 1); Height = ($maxY - $minY + 1) }
}

function Write-NormalizedFrame {
  param(
    [System.Drawing.Bitmap]$Source,
    [object]$Box,
    [string]$Path
  )

  $frame = [System.Drawing.Bitmap]::new($canvasSize, $canvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($frame)
  try {
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $maxW = $canvasSize - 28
    $maxH = $canvasSize - 26
    $scale = [Math]::Min($maxW / $Box.Width, $maxH / $Box.Height)
    if ($scale -gt 1) { $scale = 1 }
    $destW = [Math]::Max(1, [Math]::Round($Box.Width * $scale))
    $destH = [Math]::Max(1, [Math]::Round($Box.Height * $scale))
    $destX = [Math]::Round(($canvasSize - $destW) / 2)
    $destY = $canvasSize - $destH - $bottomPadding
    if ($destY -lt 0) { $destY = 0 }
    $srcRect = [System.Drawing.Rectangle]::new($Box.X, $Box.Y, $Box.Width, $Box.Height)
    $dstRect = [System.Drawing.Rectangle]::new($destX, $destY, $destW, $destH)
    $graphics.DrawImage($Source, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  }
  finally {
    $graphics.Dispose()
  }

  $frame.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $frame.Dispose()
}

function Clear-FrameFiles {
  param([string]$Directory)

  if (Test-Path -LiteralPath $Directory) {
    Get-ChildItem -LiteralPath $Directory -Filter "frame_*.png" -File | Remove-Item -Force
  }
}

New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

foreach ($action in $actions) {
  $sourcePath = Join-Path $sourceDir $action.Source
  if (-not (Test-Path -LiteralPath $sourcePath)) {
    throw "Missing source sheet: $sourcePath"
  }

  $sourceBitmap = [System.Drawing.Bitmap]::FromFile($sourcePath)
  try {
    $cols = [int]$action.Cols
    $rowBands = @(Get-RowBandsForLayout -Bitmap $sourceBitmap)
    $requiredRowIndex = 0
    if ($action.Mode -eq "directions") {
      $requiredRowIndex = (($action.Directions.Values | Measure-Object -Maximum).Maximum)
    }
    if ($rowBands.Count -le $requiredRowIndex) {
      throw "$($action.Name) needs row $requiredRowIndex, detected $($rowBands.Count) row bands"
    }
    Remove-Background -Bitmap $sourceBitmap

    $actionDir = Join-Path $outputRoot $action.Name
    New-Item -ItemType Directory -Force -Path $actionDir | Out-Null
    Clear-FrameFiles -Directory $actionDir

    if ($action.Mode -eq "horizontal") {
      $frames = @()
      for ($col = 0; $col -lt $cols; $col++) {
        $frames += Get-CellBox -Bitmap $sourceBitmap -Cols $cols -Col $col -YStart $rowBands[0].Start -YEnd $rowBands[0].End
      }
      for ($i = 0; $i -lt $frames.Count; $i++) {
        $outFile = Join-Path $actionDir ("frame_{0:D2}.png" -f $i)
        Write-NormalizedFrame -Source $sourceBitmap -Box $frames[$i] -Path $outFile
      }
      Write-Host ("{0}: wrote {1} frames" -f $action.Name, $frames.Count)
    } else {
      foreach ($direction in $action.Directions.Keys) {
        $rowIndex = [int]$action.Directions[$direction]
        if ($rowIndex -ge $rowBands.Count) {
          throw "$($action.Name) requested row $rowIndex for $direction, but only $($rowBands.Count) rows were detected"
        }

        $dirPath = Join-Path $actionDir $direction
        New-Item -ItemType Directory -Force -Path $dirPath | Out-Null
        Clear-FrameFiles -Directory $dirPath
        $frames = @()
        for ($col = 0; $col -lt $cols; $col++) {
          $frames += Get-CellBox -Bitmap $sourceBitmap -Cols $cols -Col $col -YStart $rowBands[$rowIndex].Start -YEnd $rowBands[$rowIndex].End
        }
        for ($i = 0; $i -lt $frames.Count; $i++) {
          $outFile = Join-Path $dirPath ("frame_{0:D2}.png" -f $i)
          Write-NormalizedFrame -Source $sourceBitmap -Box $frames[$i] -Path $outFile
        }
        Write-Host ("{0}/{1}: wrote {2} frames" -f $action.Name, $direction, $frames.Count)
      }
    }
  }
  finally {
    $sourceBitmap.Dispose()
  }
}
