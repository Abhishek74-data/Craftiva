@echo off
title Craftiva - Export Catalogue Images
cd /d "%~dp0"

echo =======================================================
echo   CRAFTIVA FURNITURE - EXPORT CATALOGUE IMAGES
echo =======================================================
echo.
echo Creating folder: Catalogue_Images_For_Drive ...

if not exist "Catalogue_Images_For_Drive" mkdir "Catalogue_Images_For_Drive"

echo Copying curated product images...

rem 01 Riviera Bed
copy /y "Images\Koala Catalogue\Bedroom\Beds\Riviera Isabelline White Fabric King Bed with Medium Brown Ash Veneer\01_main.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Riviera Isabelline White Fabric King Bed with Medium Brown Ash Veneer\15_lifestyle.jpg" "Catalogue_Images_For_Drive\01_Riviera_Bed_Lifestyle.jpg" >nul

rem 02 Madrid Velvet Bed
copy /y "Images\Koala Catalogue\Bedroom\Beds\Madrid Cream Velvet King Bed\01_main.jpg" "Catalogue_Images_For_Drive\02_Madrid_Bed_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Beds\Madrid Cream Velvet King Bed\12_lifestyle.jpg" "Catalogue_Images_For_Drive\02_Madrid_Bed_Lifestyle.jpg" >nul

rem 03 Kennedy Bedside Table
copy /y "Images\Koala Catalogue\Bedroom\Bedside Tables\Kennedy White Sintered Stone 3-Drawer Bedside Table\01_main.jpg" "Catalogue_Images_For_Drive\03_Kennedy_Bedside_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Bedside Tables\Kennedy White Sintered Stone 3-Drawer Bedside Table\14_lifestyle.jpg" "Catalogue_Images_For_Drive\03_Kennedy_Bedside_Lifestyle.jpg" >nul

rem 04 Archie Dresser
copy /y "Images\Koala Catalogue\Bedroom\Dressers and Tallboys\Archie Cream Wooden 6-Drawer Dresser with White Sintered Stone Top\01_main.jpg" "Catalogue_Images_For_Drive\04_Archie_Dresser_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Bedroom\Dressers and Tallboys\Archie Cream Wooden 6-Drawer Dresser with White Sintered Stone Top\16_lifestyle.jpg" "Catalogue_Images_For_Drive\04_Archie_Dresser_Lifestyle.jpg" >nul

rem 05 Antonella Sofa
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Antonella Stone Cream 3-Seater Woven Fabric Sofa\01_main.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Antonella Stone Cream 3-Seater Woven Fabric Sofa\15_lifestyle.jpg" "Catalogue_Images_For_Drive\05_Antonella_Sofa_Lifestyle.jpg" >nul

rem 06 Ava Sofa
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Ava Cream Fabric 3-Seater Sofa\01_main.jpg" "Catalogue_Images_For_Drive\06_Ava_Sofa_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Ava Cream Fabric 3-Seater Sofa\12_lifestyle.jpg" "Catalogue_Images_For_Drive\06_Ava_Sofa_Lifestyle.jpg" >nul

rem 07 Elianna Sofa
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Elianna Stone Cream 3-Seater Woven Fabric Sofa\01_main.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Fabric Sofas\Elianna Stone Cream 3-Seater Woven Fabric Sofa\02.jpg" "Catalogue_Images_For_Drive\07_Elianna_Sofa_Lifestyle.jpg" >nul

rem 08 Kelly Ottoman
copy /y "Images\Koala Catalogue\Living\Ottomans\Kelly Beige Velvet Ottoman\01_main.jpg" "Catalogue_Images_For_Drive\08_Kelly_Ottoman_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Ottomans\Kelly Beige Velvet Ottoman\08_lifestyle.jpg" "Catalogue_Images_For_Drive\08_Kelly_Ottoman_Lifestyle.jpg" >nul

rem 09 Carlo Leather Chair
copy /y "Images\West Elm Catalogue\Chairs\Carlo Leather Mid-Century Chair - Wood Legs\01.jpg" "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_Main.jpg" >nul
copy /y "Images\West Elm Catalogue\Chairs\Carlo Leather Mid-Century Chair - Wood Legs\02.jpg" "Catalogue_Images_For_Drive\09_Carlo_Leather_Chair_Lifestyle.jpg" >nul

rem 10 Xandra Dark Entertainment Unit
copy /y "Images\Koala Catalogue\Living\Entertainment Units\Xandra Dark Walnut Veneer Entertainment Unit-Brass Handles\01_main.jpg" "Catalogue_Images_For_Drive\10_Xandra_Entertainment_Main.jpg" >nul
copy /y "Images\Koala Catalogue\Living\Entertainment Units\Xandra Dark Walnut Veneer Entertainment Unit-Brass Handles\10_lifestyle.jpg" "Catalogue_Images_For_Drive\10_Xandra_Entertainment_Lifestyle.jpg" >nul

rem 11 Douglas Tatami Wardrobe
copy /y "Images\West Elm Catalogue\Almirahs\Douglas Solid Wood Tatami Armoire (38 )\01.jpg" "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_Main.jpg" >nul
copy /y "Images\West Elm Catalogue\Almirahs\Douglas Solid Wood Tatami Armoire (38 )\02.jpg" "Catalogue_Images_For_Drive\11_Douglas_Tatami_Wardrobe_Lifestyle.jpg" >nul

rem 12 Berkely Fluted Console
copy /y "Images\West Elm Catalogue\Cabinets\Berkely Media Console (80 )\01.jpg" "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_Main.jpg" >nul
copy /y "Images\West Elm Catalogue\Cabinets\Berkely Media Console (80 )\02.jpg" "Catalogue_Images_For_Drive\12_Berkely_Fluted_Console_Lifestyle.jpg" >nul

rem 13 Solid Sheesham Dining Set
copy /y "Images\West Elm Catalogue\Dining Tables\Mid-Century Extendable Dining Table (39 –92 )\01.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Main.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\Mid-Century Extendable Dining Table (39 –92 )\02.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Lifestyle.jpg" >nul

rem 14 Hargrove Round Dining
copy /y "Images\West Elm Catalogue\Dining Tables\Hargrove Round Dining Table and Chairs Set\01.jpg" "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_Main.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\Hargrove Round Dining Table and Chairs Set\02.jpg" "Catalogue_Images_For_Drive\14_Hargrove_Round_Dining_Lifestyle.jpg" >nul

rem 15 Mid-Century Extendable Dining
copy /y "Images\West Elm Catalogue\Dining Tables\Mid-Century Extendable Dining Table (39 –92 )\05.jpg" "Catalogue_Images_For_Drive\15_Extendable_Dining_Main.jpg" >nul
copy /y "Images\West Elm Catalogue\Dining Tables\Mid-Century Extendable Dining Table (39 –92 )\06.jpg" "Catalogue_Images_For_Drive\15_Extendable_Dining_Lifestyle.jpg" >nul

echo.
echo =======================================================
echo   SUCCESS! All images exported to:
echo   Craftiva\Catalogue_Images_For_Drive\
echo =======================================================
echo.
echo Opening folder now...
explorer.exe "Catalogue_Images_For_Drive"

pause
