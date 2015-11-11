invitees = open('invitees.txt', 'r')
latex = open('invites.tex', 'w')
for line in invitees: 
    latex.write("\invite[" + line[:-1] + "]{}\n")