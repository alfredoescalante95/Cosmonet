import { Spice } from './src/index.js';

export async function runSpice() {

    const spiceInstance = await new Spice().init();
    window.spiceInstance = spiceInstance;

    const buffers = await Promise.all([
        // kernels from
        // https://naif.jpl.nasa.gov/pub/naif/pds/data/msl-m-spice-6-v1.0/mslsp_1000/extras/mk/msl_chronos_v07.tm
        './kernels/lsk/naif0012.tls',
        './kernels/spk/de432s.bsp',
        './kernels/spk/bc_mpo_fcp_00094_20181020_20251101_v01.bsp',
        './kernels/spk/bc_mpo_mcp_50034_20251205_20260314_v02.bsp',

        './kernels/ck/bc_mpo_sc_sct_50041_20181019_20251219_f20181127_v02.bc',
        './kernels/ck/bc_mpo_sc_sct_50034_20251205_20260314_f20181127_v02.bc',

        './kernels/sclk/bc_mpo_step_20210204.tsc',
        './kernels/sclk/bc_mpo_fict_20181127.tsc',

        './kernels/pck/pck00010.tpc',

        './kernels/fk/bc_mpo_v26.tf',
    ].map( p => fetch( p ).then( res => res.arrayBuffer() ) ) );

    buffers.forEach( buffer => {

        spiceInstance.loadKernel( buffer );

    } );

    const utcEl = document.querySelector('[name="utc"]');
    const etEl = document.querySelector('[name="et"]');
    const etFactorEl = document.querySelector('[name="et_factor"]');
    const scQuatEl = document.querySelector('[name="sc_quat"]');
    const sunPos = document.querySelector('[name="sun_position"]');
    const earthPos = document.querySelector('[name="earth_position"]');
    const venusPos = document.querySelector('[name="venus_position"]');
    const mercuryPos = document.querySelector('[name="mercury_position"]');

    var trajData = "Test ";

    let utc = new Date().toISOString();
    utc = utc.slice(0, utc.length - 1);

    etFactorEl.childNodes[0].textContent = 1;

    var et = spiceInstance.utc2et(utc);

    setInterval(() => {

        et += 0.1 * parseFloat(etFactorEl.childNodes[0].textContent);

        const utc = spiceInstance.et2utc(et, 'C', 0);
        const scEl = spiceInstance.spkpos('SUN', et, 'ECLIPJ2000', 'NONE', 'MPO').ptarg;
        const scEarth = spiceInstance.spkpos('EARTH', et, 'ECLIPJ2000', 'NONE', 'MPO').ptarg;
        const scVenus = spiceInstance.spkpos('VENUS', et, 'ECLIPJ2000', 'NONE', 'MPO').ptarg;
        const scMercury = spiceInstance.spkpos('MERCURY', et, 'ECLIPJ2000', 'NONE', 'MPO').ptarg;
        const R = spiceInstance.pxform('MPO_SPACECRAFT', 'ECLIPJ2000', et);
        const scM = spiceInstance.m2q(R);

        utcEl.childNodes[0].textContent = utc;
        etEl.childNodes[0].textContent = et;
        sunPos.childNodes[0].textContent = `${scEl[0].toFixed(6)}, ${scEl[1].toFixed(6)}, ${scEl[2].toFixed(6)}`;
        earthPos.childNodes[0].textContent = `${scEarth[0].toFixed(6)}, ${scEarth[1].toFixed(6)}, ${scEarth[2].toFixed(6)}`;
        venusPos.childNodes[0].textContent = `${scVenus[0].toFixed(6)}, ${scVenus[1].toFixed(6)}, ${scVenus[2].toFixed(6)}`;
        mercuryPos.childNodes[0].textContent = `${scMercury[0].toFixed(6)}, ${scMercury[1].toFixed(6)}, ${scMercury[2].toFixed(6)}`;
        scQuatEl.childNodes[0].textContent = `${scM[0].toFixed(6)}, ${scM[1].toFixed(6)}, ${scM[2].toFixed(6)}, ${scM[3].toFixed(6)}`;

        trajData = utc;
        //var i;
        //for (i = 0; i < 60; i++) {
        //    const trajPlot  = spiceInstance.spkpos('MPO', et - i*3600, 'MPO_SPACECRAFT', 'NONE', 'SUN').ptarg;
        //    trajData += `${(trajPlot[0] + scEl[0]).toFixed(6)}, ${(trajPlot[1] + scEl[1]).toFixed(6)}, ${(trajPlot[2] + scEl[2]).toFixed(6)} `;
        //}

    }, 10);

    return trajData;
};
