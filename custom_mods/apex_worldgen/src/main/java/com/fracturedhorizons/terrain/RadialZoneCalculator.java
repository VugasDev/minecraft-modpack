package com.fracturedhorizons.terrain;

import com.fracturedhorizons.config.FracturedConfig;

public class RadialZoneCalculator {

    public ZoneSample sample(int blockX, int blockZ) {
        double dist = Math.sqrt((double) blockX * blockX + (double) blockZ * blockZ);

        double mainlandRadius = FracturedConfig.MAINLAND_RADIUS.get();
        double outerRimStart = FracturedConfig.OUTER_RIM_START.get();

        if (dist <= mainlandRadius) {
            return new ZoneSample(Zone.MAINLAND, dist, 0.0, 0.0);
        }
        if (dist >= outerRimStart) {
            return new ZoneSample(Zone.OUTER_RIM, dist, 1.0, 1.0);
        }

        double t = (dist - mainlandRadius) / (outerRimStart - mainlandRadius);
        // smoothstep: t * t * (3 - 2t)
        double s = t * t * (3.0 - 2.0 * t);
        return new ZoneSample(Zone.TRANSITION, dist, t, s);
    }
}
