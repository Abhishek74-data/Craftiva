@echo off
setlocal enabledelayedexpansion
title Craftiva - Multi-Angle Image Exporter
cd /d "%~dp0"

echo =======================================================
echo   EXPORTING MULTI-ANGLE PHOTOS (4-5 PHOTOS PER ITEM)
echo =======================================================

if not exist "Catalogue_Images_For_Drive" mkdir "Catalogue_Images_For_Drive"
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"

rem 01 Riviera Bed
copy /y "Images\Koala Catalogue\Bedroom\Beds\Riviera*\01_main.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_1.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Riviera*\02.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_2.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Riviera*\03.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_3.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Riviera*\04.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_4.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Riviera*\15_lifestyle.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_5.jpg" >nul

rem 02 Madrid Bed
copy /y "Images\Koala Catalogue\Bedroom\Beds\Madrid*\01_main.jpg" "Catalogue_Images_For_Drive\02_Madrid_Bed_1.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Madrid*\02.jpg" "Catalogue_Images_For_Drive\02_Madrid_Bed_2.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Madrid*\03.jpg" "Catalogue_Images_For_Drive\02_Madrid_Bed_3.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Madrid*\12_lifestyle.jpg" "Catalogue_Images_For_Drive\02_Madrid_Bed_4.jpg" >nul

rem 03 Kennedy Bedside
copy /y "Images\Koala Catalogue\Bedroom\Bedside Tables\Kennedy*\01_main.jpg" "Catalogue_Images_For_Drive\03_Kennedy_Bedside_1.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Bedside Tables\Kennedy*\02.jpg" "Catalogue_Images_For_Drive\03_Kennedy_Bedside_2.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Bedside Tables\Kennedy*\03.jpg" "Catalogue_Images_For_Drive\03_Kennedy_Bedside_3.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Bedside Tables\Kennedy*\14_lifestyle.jpg" "Catalogue_Images_For_Drive\03_Kennedy_Bedside_4.jpg" >nul

rem 04 Archie Dresser
copy /y "Images\Koala Catalogue\Bedroom\Dressers and Tallboys\Archie*\01_main.jpg" "Catalogue_Images_For_Drive\04_Archie_Dresser_1.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Dressers and Tallboys\Archie*\02.jpg" "Catalogue_Images_For_Drive\04_Archie_Dresser_2.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Dressers and Tallboys\Archie*\03.jpg" "Catalogue_Images_For_Drive\04_Archie_Dresser_3.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Dressers and Tallboys\Archie*\16_lifestyle.jpg" "Catalogue_Images_For_Drive\04_Archie_Dresser_4.jpg" >nul

rem 05 Antonella Sofa
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Antonella*\01_main.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_1.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Antonella*\02.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_2.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Antonella*\03.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_3.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Antonella*\04.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_4.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Antonella*\15_lifestyle.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_5.jpg" >nul

rem 06 Ava Sofa
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Ava*\01_main.jpg" "Catalogue_Images_For_Drive\06_Ava_Sofa_1.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Ava*\02.jpg" "Catalogue_Images_For_Drive\06_Ava_Sofa_2.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Ava*\03.jpg" "Catalogue_Images_For_Drive\06_Ava_Sofa_3.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Ava*\12_lifestyle.jpg" "Catalogue_Images_For_Drive\06_Ava_Sofa_4.jpg" >nul

rem 07 Elianna Sofa
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Elianna*\01_main.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_1.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Elianna*\02.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_2.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Elianna*\03.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_3.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Elianna*\04.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_4.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Elianna*\13_lifestyle.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_5.jpg" >nul

rem 08 Kelly Ottoman
copy /y "Images\Koala Catalogue\Living\Ottomans\Kelly*\01_main.jpg" "Catalogue_Images_For_Drive\08_Kelly_Ottoman_1.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Ottomans\Kelly*\02.jpg" "Catalogue_Images_For_Drive\08_Kelly_Ottoman_2.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Ottomans\Kelly*\03.jpg" "Catalogue_Images_For_Drive\08_Kelly_Ottoman_3.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Ottomans\Kelly*\08_lifestyle.jpg" "Catalogue_Images_For_Drive\08_Kelly_Ottoman_4.jpg" >nul

rem 09 Carlo Chair
copy /y "Images\West Elm Catalogue\Chairs\Carlo*\01.jpg" "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_1.jpg" >nul
copy /y "Images\West Elm Catalogue\Chairs\Carlo*\02.jpg" "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_2.jpg" >nul
copy /y "Images\West Elm Catalogue\Chairs\Carlo*\03.jpg" "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_3.jpg" >nul
copy /y "Images\West Elm Catalogue\Chairs\Carlo*\04.jpg" "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_4.jpg" >nul

rem 10 Xandra Unit
copy /y "Images\Koala Catalogue\Living\Entertainment Units\Xandra*\01_main.jpg" "Catalogue_Images_For_Drive\10_Xandra_Entertainment_1.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Entertainment Units\Xandra*\02.jpg" "Catalogue_Images_For_Drive\10_Xandra_Entertainment_2.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Entertainment Units\Xandra*\03.jpg" "Catalogue_Images_For_Drive\10_Xandra_Entertainment_3.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Entertainment Units\Xandra*\10_lifestyle.jpg" "Catalogue_Images_For_Drive\10_Xandra_Entertainment_4.jpg" >nul

rem 11 Douglas Wardrobe
copy /y "Images\West Elm Catalogue\Almirahs\Douglas*\01.jpg" "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_1.jpg" >nul
copy /y "Images\West Elm Catalogue\Almirahs\Douglas*\02.jpg" "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_2.jpg" >nul
copy /y "Images\West Elm Catalogue\Almirahs\Douglas*\03.jpg" "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_3.jpg" >nul
copy /y "Images\West Elm Catalogue\Almirahs\Douglas*\04.jpg" "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_4.jpg" >nul

rem 12 Berkely Console
copy /y "Images\West Elm Catalogue\Cabinets\Berkely*\01.jpg" "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_1.jpg" >nul
copy /y "Images\West Elm Catalogue\Cabinets\Berkely*\02.jpg" "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_2.jpg" >nul
copy /y "Images\West Elm Catalogue\Cabinets\Berkely*\03.jpg" "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_3.jpg" >nul
copy /y "Images\West Elm Catalogue\Cabinets\Berkely*\04.jpg" "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_4.jpg" >nul

rem 13 Sheesham Dining
copy /y "Images\West Elm Catalogue\Dining Tables\*Extendable*\01.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_1.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\*Extendable*\02.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_2.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\*Extendable*\03.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_3.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\*Extendable*\04.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_4.jpg" >nul

rem 14 Hargrove Round Dining
copy /y "Images\West Elm Catalogue\Dining Tables\Hargrove*\01.jpg" "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_1.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\Hargrove*\02.jpg" "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_2.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\Hargrove*\03.jpg" "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_3.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\Hargrove*\04.jpg" "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_4.jpg" >nul

rem Copy main & lifestyle aliases as well
copy /y "Catalogue_Images_For_Drive\*_1.jpg" "Catalogue_Images_For_Drive\*_Main.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\01_Riviera_Bed_5.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\02_Madrid_Bed_4.jpg" "Catalogue_Images_For_Drive\02_Madrid_Bed_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\03_Kennedy_Bedside_4.jpg" "Catalogue_Images_For_Drive\03_Kennedy_Bedside_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\04_Archie_Dresser_4.jpg" "Catalogue_Images_For_Drive\04_Archie_Dresser_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\05_Antonella_Sofa_5.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\06_Ava_Sofa_4.jpg" "Catalogue_Images_For_Drive\06_Ava_Sofa_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\07_Elianna_Sofa_5.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\08_Kelly_Ottoman_4.jpg" "Catalogue_Images_For_Drive\08_Kelly_Ottoman_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_4.jpg" "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\10_Xandra_Entertainment_4.jpg" "Catalogue_Images_For_Drive\10_Xandra_Entertainment_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_4.jpg" "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_4.jpg" "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_4.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Lifestyle.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_4.jpg" "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_Lifestyle.jpg" >nul 2>nul

echo Copying to public folder...
copy /y "Catalogue_Images_For_Drive\*.*" "public\Catalogue_Images_For_Drive\" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\*.*" "public\img\" >nul 2>nul

echo Done! All multi-angle photos copied.
