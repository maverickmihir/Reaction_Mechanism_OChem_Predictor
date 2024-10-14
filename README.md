# Reaction_Mechanism_OChem_Predictor
This project uses AI to help predict how chemicals will react. It uses a trained model and special tools to show the reactions and explain how they work

#### Project Title: Reaction Prediction with AI and visualization libraries
#Description:
This project uses AI to help predict how chemicals will react. It uses a trained model and special tools to show the reactions and explain how they work. This is useful for students learning about organic chemistry. Target Audience is students trying to learn and understand inner mechanism of Organic Chemistry reactions. This This project also uses ChemDoodle and Openbabel as visualization libraries.

# Prerequisites:

1. Node.js and npm (or yarn) installed
2. ChemDoodle library (you may need to install it using npm or yarn)
3. Babel library (you may need to install it using npm or yarn)
Installation:

# Install dependencies:
1. npm install
[TBD: Additional dependencies]

# Clone repository:
1. Clone this repository or download the project files.
git clone https://github.com/mihir_rane/predictortool

2.  Navigate to the project directory in your terminal.
cd mihir_rane/predictortool
[TBD: Additional Steps]

# Usage:
1. Run the application: Execute the main script
node server.js
2. Provide input: The application will prompt you to enter the molecular structure of the reactant. You can use ChemDoodle's input mechanisms or provide the structure in a supported format (e.g., SMILES, CML).
[TBD: future phase you can input SMILES or CML directly without using sketcher]
3. Get output: The application will process the input, generate the predicted reaction and mechanism, and display the results
4. Try out this Predictor Tool check [Mihir Rane Chemiqle](https://chemmr.wl.r.appspot.com/)

# Training data:
1. reaction_training_data.json will provide pretrained data for analyzing the reactants and explaining the mechanism in a format that can be used by visualization libraries
2. v1 version is focused on alcohol oxidation training data; v2 version will have additional training data for other reaction types

# Important Note:
This project is aimed at helping students understand organic chemistry. It's not a commercial product, but it demonstrates how AI can be used to teach these concepts to high school and undergraduate students


# License:
The ChemDoodle Web Components library is licensed under version 3
// of the GNU GENERAL PUBLIC LICENSE.

Please refer to the Note below
// https://web.chemdoodle.com
//
// Copyright 2009-2024 iChemLabs, LLC.  All rights reserved.
//
// The ChemDoodle Web Components library is licensed under version 3
// of the GNU GENERAL PUBLIC LICENSE.
//
// You may redistribute it and/or modify it under the terms of the
// GNU General Public License as published by the Free Software Foundation,
// either version 3 of the License, or (at your option) any later version.
//
// As an exception to the GPL, you may distribute this packed form of
// the code without the copy of the GPL license normally required,
// provided you include this license notice and a URL through which
// recipients can access the corresponding unpacked source code. 
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ChemDoodle Web Components employs 3rd party libraries under the MIT
// license. For a full list with links to the original source, go to:
// https://web.chemdoodle.com/installation/download/#libraries
//
// Please contact iChemLabs <https://www.ichemlabs.com/contact-us> for
// alternate licensing options.
//
