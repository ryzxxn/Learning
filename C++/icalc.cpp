#include <iostream>

using namespace std;

int main() {
    // Constants
    const int ICR = 10; // Insulin-to-Carbohydrate Ratio (ICR)
    const int correctionFactor = 50; // Correction Factor

    // Input variables
    int currentSugarLevel = 245; // Current blood sugar level in mg/dL
    int targetSugarLevel = 110; // Target blood sugar level in mg/dL
    int carbGrams = 45; // Grams of carbohydrates

    // Calculate insulin dose for carbohydrates
    int insulinCarbs = carbGrams / ICR;

    // Calculate correction needed
    int correctionNeeded = currentSugarLevel - targetSugarLevel;

    // Calculate correction dose
    int correctionDose = correctionNeeded / correctionFactor;

    // Total insulin dose
    int totalInsulinDose = insulinCarbs + correctionDose;

    // Output the results
    cout << "Insulin Dose (for carbohydrates): " << insulinCarbs << " units" << endl;
    cout << "Correction Dose: " << correctionDose << " units" << endl;
    cout << "Total Insulin Dose: " << totalInsulinDose << " units" << endl;

    return 0;
}
