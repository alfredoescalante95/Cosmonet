KPL/MK

Meta-kernel for BepiColombo Dataset v261 -- Planning 20210222_001
============================================================================

   This meta-kernel lists the BepiColombo Planning SPICE kernels
   that provide information for the Planning scenario.

   The kernels listed in this meta-kernel and the order in which
   they are listed are picked to provide the best data available and
   the most complete coverage for the BepiColombo Planning scenario.

   This meta-kernel was generated with the Auxiliary Data Conversion
   System version: ADCSng v2.7.4.


Usage of the Meta-kernel
---------------------------------------------------------------------------

   This file is used by the SPICE system as follows: programs that make use
   of this kernel must "load" the kernel normally during program
   initialization. Loading the kernel associates the data items with
   their names in a data structure called the "kernel pool". The SPICELIB
   routine FURNSH loads a kernel into the pool.

   The kernels listed below can be obtained from the ESA SPICE FTP server:

      ftp://spiftp.esac.esa.int/data/SPICE/BEPICOLOMBO/kernels/


Implementation Notes
---------------------------------------------------------------------------

   It is recommended that users make a local copy of this file and
   modify the value of the PATH_VALUES keyword to point to the actual
   location of the BepiColombo SPICE data set's ``data'' directory on
   their system. Replacing ``/'' with ``\'' and converting line
   terminators to the format native to the user's system may also be
   required if this meta-kernel is to be used on a non-UNIX workstation.


-------------------

   This file was created on February 22, 2021 by Marc Costa Sitja ESA/ESAC.
   The original name of this file was bc_plan_v261_20210222_001.tm.


   \begindata

     PATH_VALUES       = ( './data' )

     PATH_SYMBOLS      = ( 'KERNELS' )

     KERNELS_TO_LOAD   = (

                           '$KERNELS/ck/bc_mpo_sc_sct_50041_20181019_20251219_f20181127_v02.bc'

                           '$KERNELS/fk/bc_mpo_v26.tf'

                           '$KERNELS/lsk/naif0012.tls'

                           '$KERNELS/pck/pck00010.tpc'

                           '$KERNELS/pck/earth_070425_370426_predict.bpc'

                           '$KERNELS/sclk/bc_mpo_step_20210204.tsc'
                           '$KERNELS/sclk/bc_mpo_fict_20181127.tsc'

                           '$KERNELS/spk/de432s.bsp'
                           '$KERNELS/spk/bc_mpo_fcp_00094_20181020_20251101_v01.bsp'

                         )

   \begintext


SPICE Kernel Dataset Version
--------------------------------------------------------------------------

   The SPICE Kernel Dataset version of the kernels present in this
   meta-kernel is provided by the following keyword (please note that
   this might not be the last version of the SPICE Kernel Dataset):

   \begindata

      SKD_VERSION = 'v261_20210222_001'

   \begintext


Contact Information
--------------------------------------------------------------------------

   If you have any questions regarding this file contact the
   ESA SPICE Service (ESS) at ESAC:

           Alfredo Escalante Lopez
           (+34) 91-8131-429
           spice@sciops.esa.int,


End of MK file.
