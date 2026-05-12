package com.fracturedhorizons.terrain;

import com.fracturedhorizons.config.SkyIslandConfig;
import net.minecraft.world.level.levelgen.synth.NormalNoise;

public class IslandShapeSampler {

    private final SkyIslandConfig config;
    // Dummy noise generator reference. In a real environment, you'd initialize
    // this with the world seed.
    private final SimplexNoise bulgeNoise;

    public IslandShapeSampler(SkyIslandConfig config) {
        this.config = config;
        // Einfacher Platzhalter für 3D/2D Noise. 
        // Für NeoForge sollte hier net.minecraft.world.level.levelgen.synth.SimplexNoise oder PerlinNoise stehen
        this.bulgeNoise = new SimplexNoise(123456L); 
    }

    /**
     * SDF für Außeninseln mit stufigem (terraced) Terralith-Style und Tropfen-Verzerrung.
     */
    public double getOuterBaseShape(int x, int y, int z, IslandInstance island) {
        double dx = x - island.centerX();
        double dy = y - island.centerY();
        double dz = z - island.centerZ();

        // Terracing-Effekt (Terralith Autumn Style)
        // Y in 8er bis 16er Stufen zwingen für blockige Klippen statt glatter Hänge
        double steppedY = Math.floor(dy / 12.0) * 12.0;

        // Skalierung je nach Stil
        double spread = island.style().baseSpread;
        double relief = island.style().verticalRelief;

        // Verzerre y nach unten, damit die Unterseite massiv tiefer hängt (Tropfenform)
        if (steppedY < 0) {
            steppedY /= 1.8; 
        }

        double distSq = (dx * dx) / (spread * spread) + (steppedY * steppedY) / (relief * relief) + (dz * dz) / (spread * spread);
        double rSq = island.radius() * island.radius();
        
        return (rSq - distSq) / rSq; 
    }

    /**
     * SDF für die Hauptinsel mit Y-128 Limit und unregelmäßigen Bulges/Fragmenten am Rand.
     */
    public double getMainBaseShape(int x, int y, int z, double distFromCenter) {
        // 1. Rand-Blobs berechnen
        // Grober 2D-Noise verzerrt den Kern-Radius um bis zu +/- 80 Blöcke.
        // Das erzeugt Buchten und abgerissene Bruchstücke.
        double bulgeVal = bulgeNoise.getValue(x * 0.008, z * 0.008); 
        double effectiveRadius = config.coreRadius + (bulgeVal * 80.0);

        // 2. Y-128 Extrabasis
        double dy = y - 64; 
        if (dy < 0) {
            dy /= 3.0; // Zieht die Unterseite massiv bis in die Tiefen von -128
        }

        // 3. SDF Auswertung
        // Horizontale Dichte: fällt ab effectiveRadius stark ab
        double horizontalFalloff = (effectiveRadius - distFromCenter) / 40.0; // Fade-Breite ca. 40 Blöcke
        // Vertikale Dichte: fällt nach oben und unten parabolisch ab
        double verticalFalloff = 1.0 - ((dy * dy) / (192.0 * 192.0));
        
        return Math.min(horizontalFalloff, verticalFalloff);
    }
    
    // Simplex Noise Helper für Standalone (wäre Vanilla Noise in echtem Code)
    private static class SimplexNoise {
        public SimplexNoise(long seed) {}
        public double getValue(double x, double z) {
            // Pseudo-Noise für Bulge-Demonstration
            return Math.sin(x) * Math.cos(z); 
        }
    }
}
