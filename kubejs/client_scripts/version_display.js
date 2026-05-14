// version_display.js
// Zeigt die Modpack-Version oben links im Main Menu an.
// Wird bei jedem Pack-Bump in PACK_VERSION manuell angepasst.

const PACK_NAME = 'Gaia Awakening'
const PACK_VERSION = '0.1.28-alpha'

ClientEvents.screenDrawn('minecraft:title', event => {
    const graphics = event.graphics
    const font = Client.getMinecraft().font
    // Position: oben links, leicht eingerückt
    graphics.drawString(font, `§a${PACK_NAME} §7v${PACK_VERSION}`, 4, 4, 0xFFFFFF, true)
})
