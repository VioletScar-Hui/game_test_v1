$jsDir = Join-Path $PSScriptRoot "js"
$outputDir = $PSScriptRoot
$bundleFile = Join-Path $outputDir "bundle.js"
$htmlFile = Join-Path $outputDir "play.html"

$fileOrder = @(
    'config/constants.js',
    'config/characters.js',
    'config/enemies-data.js',
    'config/passives-data.js',
    'config/weapons-data.js',
    'config/arcanas-data.js',
    'config/unlocks-data.js',
    'config/waves-data.js',
    'config/levels.js',
    'config/narrative-data.js',
    'config/relics-data.js',
    'config/challenges-data.js',
    'config/skilltree-data.js',
    'config/interactables-data.js',
    'config/animation-data.js',
    'config/render-scale.js',
    'config/assets.js',
    'entities/entity.js',
    'entities/items.js',
    'entities/interactable.js',
    'entities/projectile.js',
    'entities/cross-projectile.js',
    'entities/weapon-system.js',
    'entities/passive-inventory.js',
    'entities/player.js',
    'entities/enemy.js',
    'systems/audio.js',
    'systems/music-intro.js',
    'systems/music-menu.js',
    'systems/music-game.js',
    'systems/music-boss.js',
    'systems/camera.js',
    'systems/entity-manager.js',
    'systems/input.js',
    'systems/rng.js',
    'systems/juice.js',
    'systems/animation.js',
    'systems/intro.js',
    'systems/loading.js',
    'systems/menu-button.js',
    'ui/helpers.js',
    'ui/render-world.js',
    'ui/render-hud.js',
    'ui/render-paused.js',
    'ui/render-shop.js',
    'ui/render-game-over.js',
    'ui/render-victory.js',
    'ui/render-level-select.js',
    'ui/render-character-select.js',
    'ui/render-save-select.js',
    'ui/bestiary-model.js',
    'ui/weapon-preview-model.js',
    'ui/render-settings.js',
    'ui/render-skilltree.js',
    'ui/render-arcana.js',
    'ui/render-levelup.js',
    'ui/render-chest.js',
    'ui/render-powerup.js',
    'ui/render-interactable-choice.js',
    'ui/render-playing-buttons.js',
    'ui/render-level-loading.js',
    'game/save-system.js',
    'game/bestiary.js',
    'game/game-balance.js',
    'game/m4-systems.js',
    'game/powerup-store.js',
    'game/unlock-manager.js',
    'game/levelup-controls.js',
    'game/functional-weapons.js',
    'game/evolution.js',
    'game/upgrade-pool.js',
    'game/arcana-schedule.js',
    'game/chest-rewards.js',
    'game/game-update.js',
    'game/game-render.js',
    'game/input-click.js',
    'game/input-hover.js',
    'game/input-keyboard.js',
    'game/game-helpers.js',
    'game/game-core.js',
    'main.js'
)

$sb = [System.Text.StringBuilder]::new()

foreach ($rel in $fileOrder) {
    $fullPath = Join-Path $jsDir $rel
    if (-not (Test-Path $fullPath)) {
        Write-Host "WARNING: Missing file $rel"
        continue
    }
    $content = Get-Content $fullPath -Raw -Encoding UTF8
    $content = $content -replace '(?m)^import\s+\{[^}]*\}\s+from\s+[^;]+;?\s*$',''
    $content = $content -replace '(?m)^import\s+[^;]+;?\s*$',''
    $content = $content -replace '(?m)^export\s+',''
    [void]$sb.AppendLine("// --- $rel ---")
    [void]$sb.AppendLine($content.TrimEnd())
    [void]$sb.AppendLine("")
    [void]$sb.AppendLine("")
}

$bundleContent = $sb.ToString()
[System.IO.File]::WriteAllText($bundleFile, $bundleContent, [System.Text.Encoding]::UTF8)

$htmlContent = @'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vampire Survivors - Spiceland</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      overflow: hidden;
    }
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
      object-fit: contain;
      image-rendering: pixelated;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>
  <script src="bundle.js?v=20260615-compact-impacts"></script>
</body>
</html>
'@

[System.IO.File]::WriteAllText($htmlFile, $htmlContent, [System.Text.Encoding]::UTF8)

Write-Host "Bundle created: $bundleFile"
Write-Host "Play HTML created: $htmlFile"
Write-Host "Double-click play.html to start the game!"
