invitees = open('invitees.txt', 'r')
for line in invitees: 
    ind = open('individualinvitations/'+line[:-2] + '.tex', 'w')
    ind.write("\documentclass{letter}\n\input{../invitefunc.tex}\n\pagenumbering{gobble}\n\usepackage[top=2cm, bottom=2cm, outer=2cm, inner=2cm]{geometry}\n\usepackage[pages=some]{background}\n\usepackage{ragged2e}\n\\backgroundsetup{\nscale=1,\ncolor=black,\nopacity=0.4,\nangle=0,\ncontents={%\n\includegraphics[width=\paperwidth,height=\paperheight]{../letters.png}\n}%\n}\n\n\\begin{document}")
    ind.write("\invite[" + line[:-1] + "]{}\n")
    ind.write("\n\end{document}")