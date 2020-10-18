import csv

csvpath = r"Resources/election_data.csv"
print(csvpath)

#total votes list
totalVotes = 0

# #candidate counts list
correyCount = 0
khanCount = 0
liCount = 0
otooleCount = 0

candidateDict = {}

with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

     # Read the header row first (skip this step if there is no header)
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

     # Read each row of data after the header
    for row in csvreader:
        totalVotes = totalVotes + 1

# # #         #row[0] = Voter ID
# # #         #row[1] = County
# # #         #row[2] = Candidate


# if candidate is in the dict 
# then add 1 to the value
# if candidate isn't in dict
#then create new item, initialize value 1
        candidate = row[2]
        if candidate in candidateDict.keys():
            candidateDict[candidate] += 1
        else:
            candidateDict[candidate] = 1


#print percentage of votes won by each candidate
#1st time success at Google Fu!!!
#https://stackoverflow.com/questions/30964577/divide-each-python-dictionary-value-by-total-value
a = {'Khan': 2218231, 'Correy': 704200, 'Li': 492940, "O'Tooley": 105630}
def func1(my_diction):  
    total = 0  
    for i in my_diction:  
        total = total + my_diction[i]  
    for j in my_diction:  
        my_diction[j] = (float)(my_diction[j])/total  
    return my_diction   
# print (func1(a))

winner = max(candidateDict, key=candidateDict.get)
# print(winner)

candidateStrings = [f"{key}: {round((candidateDict[key] / totalVotes)*100,3)}% ({candidateDict[key]})" for key in candidateDict.keys()]
candidateStrings = "\n".join(candidateStrings)

summaryString = f"""Election Results
-------------------------
Total Votes: {totalVotes}
-------------------------
{candidateStrings}
-------------------------
Winner: {winner}
-------------------------
"""
print(summaryString)

#write summary string
with open("poll_results.txt", "w") as file1:
    file1.write(summaryString)

