package com.fracturedhorizons.terrain;

import com.fracturedhorizons.config.SkyIslandConfig;

public class ZoneResolver {
    private final SkyIslandConfig config;

    public ZoneResolver(SkyIslandConfig config) {
        this.config = config;
    }

    public Zone resolveZone(double distSq) {
        if (distSq <= config.coreRadius * config.coreRadius) {
            return Zone.MAIN_CORE;
        } else if (distSq <= config.fadeEnd * config.fadeEnd) {
            return Zone.MAIN_FADE;
        } else if (distSq <= config.bufferEnd * config.bufferEnd) {
            return Zone.BUFFER;
        } else {
            return Zone.OUTER;
        }
    }
    
    // Hilfsmethode für den linearen Fade-Faktor, vorberechnet pro Spalte
    public double getFadeFactor(double distFromCenter) {
        if (distFromCenter <= config.fadeStart) {
            return 1.0;
        }
        if (distFromCenter >= config.fadeEnd) {
            return 0.0;
        }
        
        // Mapped linearly from fadeStart to fadeEnd -> 1.0 to 0.0
        double mapped = (config.fadeEnd - distFromCenter) / (config.fadeEnd - config.fadeStart);
        // Smoothstep für organischen Übergang: 3x^2 - 2x^3
        return mapped * mapped * (3.0 - 2.0 * mapped);
    }
}
