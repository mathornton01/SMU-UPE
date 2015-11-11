mkdir individualinvitations
python individ.py
for output in $(ls ./individualinvitations)
do 
    pdflatex $output
done 