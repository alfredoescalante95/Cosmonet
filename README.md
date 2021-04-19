<p align="center">
  <img
    alt="Cosmonet"
    src="./images/logo.png"
    width="100"
  />
</p>

### Cosmonet

Cosmonet is a 3D viewer showing realtime geometry of ESA Planetary Missions. It makes use of CSPICE library ported to JavaScript vis emscripten from Timecraft.js (made by JPL). The SKDs of the ESA Planetary missions can be accessed at [ESA SPICE SKDs](https://www.cosmos.esa.int/web/spice/data)

### Loading a Metakernel

```js
import { Spice, parseMetakernel } from "timecraftjs";

const spiceInstance = await new Spice().init();

// load the kernel contents
const metaKernel = await fetch(
    "../kernels/extras/mk/msl_chronos_v07.tm"
).then((res) => res.text());

// parse the kernel
const kernelPaths = parseMetakernel(metaKernel).paths;

// load the kernels in the meta kernel
const kernelPromises = kernelPaths.map((p) => {
    return fetch(p)
        .then((res) => res.buffer())
        .then((buffer) => spiceInstance.loadKernel(buffer));
});

await Promise.all(kernelPromises);

// ready for time conversion!
```

### Included Files

This section lists the files included in this package and describes what each of them does. This section is mainly for people who wish to modify this package, if you simply wish to use it you can likely skip this section.

#### cspice.js

This file contains the ported CSPICE source code. It is extremely large and should not be modified. This file must begin executing after spice.js and timecraft.js, so make sure to include it last. If running in Node, import timecraft.js, not this file.

#### spice.js

This file contains the wrapper class that allows access to the functionality in cspice.js. The version of spice.js here is focused on time conversions, but the rest of the CSPICE functionality could be exposed if needed.

#### Spice Functions

Most of the functions made available in this library are functions from CSPICE called in a more Javascript-like way. Please see [differences between cspice and spice.js](https://github.com/NASA-AMMOS/timecraftjs.js#differences-between-cspice-and-spicejs) for specifics.

While the ported C code technically contains all CSPICE functionality, the following functions have been exposed in this class. The [CSPICE documentation](https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/C/cspice/index.html) for each of these functions is correct, but below you can see their more Javascript-like call format supported here. All documented CSpice function inputs are passed into the Javascript equivalents below while all outputs are returned as a dictionary indexed by parameter name or as a single value if there is only a single output.

```
b1900()
b1950()
bodc2n( code )
bodc2s( code )
boddef( name, code )
bodfnd( body, item )
bodn2c( name )
bods2c( name )
bodvcd( bodyid, item, maxn )
bodvrd( body, item, maxn )
convrt( x, in_var, out )
deltet( epoch, eptype )
erract( op, action )
errprt( op, list )
et2lst( et, body, lon, type )
et2utc( et, format, prec )
etcal( et )
failed()
furnsh( kernelPaths )
getmsg( options )
j1900()
j1950()
j2000()
j2100()
jyear()
ltime( etobs, obs, dir, targ )
reset()
scdecd( sc, sclkdp )
sce2c( sc, et )
sce2s( sc, et )
sce2t( sc, et )
scencd( sc, sclkch )
scfmt( sc, ticks )
scpart( sc )
scs2e( sc, sclkch )
sct2e( sc, sclkdp )
sctiks( sc, clkstr )
spd()
spkpos( targ, et, ref, abcorr, obs )
str2et( str )
timdef( action, item, value )
timout( et, pictur )
tparse( string )
tpictr( sample )
tsetyr( year )
tyear()
unitim( epoch, insys, outsys )
unload( file )
utc2et( utcstr )
```


## Recompiling cspice.js

`cspice.js` is the massive Javascript file resulting from the automatic porting via Emscripten. As such, if CSPICE updates, this file will need to be recompiled. The current version of cspice.js was created from the [Mac/OSX 64 Bit Toolkit](https://naif.jpl.nasa.gov/naif/toolkit_C_MacIntel_OSX_AppleC_64bit.html) on April 12, 2021 with version emscripten version 2.0.17.

In order to recompile cspice.js, follow these steps:

1. Download relevant toolkit from [the NAIF website](https://naif.jpl.nasa.gov/naif/toolkit_C.html).
1. Download [emsdk](https://github.com/emscripten-core/emsdk) to download and manage "emscripten" versions.
1. Install the latest version of emscripten and source the emsdk environment variables from `emsdk_env.sh`.
1. Unzip the CSpice source folder and put the contents into the `generation/cspice` folder.
1. Run `generation/generate-cspice.sh` to generate the js library file in the folder.
1. Move the newly generated `cspice.js` file into the `src/` folder.
