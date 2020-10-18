import csv
import numpy as np

csvpath = r"Resources/budget_data.csv"
print(csvpath)

totalMonths = 0
totalProfits = 0

isFirstRow = True
lastRowProfit = 0
changeDict = {}

with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

     # Read the header row first (skip this step if there is no header)
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

     # Read each row of data after the header
    for row in csvreader:
        # print(row)

        #row[0] = Month-Year
        #row[1] = Profit/Losses

        totalMonths += 1
        totalProfits += int(row[1])

# if first row, do nothing
#otherwise, get change
#row minus last row profit
#add dict with month as key
#update last row profit
#continue loop

        if isFirstRow:
            lastRowProfit = int(row[1])
            isFirstRow = False
        else:
            change = int(row[1]) - lastRowProfit
            changeDict[row[0]] = change
            lastRowProfit = int(row[1])


# print(totalMonths)
# print(totalProfits)

# print(changeDict)
averageChange = np.mean(list(changeDict.values()))
# averageChange = list(changeDict.values()).sum() / len(ist(changeDict.values()))

maxChangeMonth = max(changeDict, key=changeDict.get)
maxChangeValue = changeDict[maxChangeMonth]

minChangeMonth = min(changeDict, key=changeDict.get)
minChangeValue = changeDict[minChangeMonth]

# print(maxChangeMonth)
# print(maxChangeValue)
# print(minChangeMonth)
# print(minChangeValue)

summaryString = f"""Financial Analysis
-------------------------
Total Months: {totalMonths}
Total: ${totalProfits}
Average Change: ${round(averageChange, 2)}
Greatest Increase in Profits: {maxChangeMonth} (${maxChangeValue})
Greatest Decrease in Profits: {minChangeMonth} (${minChangeValue})
"""
print(summaryString)

#write summary string
with open("bank_results.txt", "w") as file1:
    file1.write(summaryString)