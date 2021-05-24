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

        './kernels/ck/bc_mpo_sc_sct_50041_20181019_20251219_f20181127_v02.bc',

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
    const sunPos = document.querySelector('[name="sun_position"]');

    var trajData = "Test ";

    let utc = new Date().toISOString();
    utc = utc.slice(0, utc.length - 1);

    etFactorEl.childNodes[0].textContent = 1;

    var et = spiceInstance.utc2et(utc);

    setInterval(() => {

        et += 0.1 * parseFloat(etFactorEl.childNodes[0].textContent);

        const utc = spiceInstance.et2utc(et, 'C', 0);
        const scEl = spiceInstance.spkpos('SUN', et, 'MPO_SPACECRAFT', 'NONE', 'MPO').ptarg;

        utcEl.childNodes[0].textContent = utc;
        etEl.childNodes[0].textContent = et;
        sunPos.childNodes[0].textContent = `${scEl[0].toFixed(6)}, ${scEl[1].toFixed(6)}, ${scEl[2].toFixed(6)}`;

        trajData = utc;
        //var i;
        //for (i = 0; i < 60; i++) {
        //    const trajPlot  = spiceInstance.spkpos('MPO', et - i*3600, 'MPO_SPACECRAFT', 'NONE', 'SUN').ptarg;
        //    trajData += `${(trajPlot[0] + scEl[0]).toFixed(6)}, ${(trajPlot[1] + scEl[1]).toFixed(6)}, ${(trajPlot[2] + scEl[2]).toFixed(6)} `;
        //}

    }, 100);

    return trajData;
};
