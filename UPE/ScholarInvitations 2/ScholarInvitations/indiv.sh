mkdir individualinvitations
python individ.py
cd individualinvitations
for output in $(ls)
do 
    pdflatex "$output"
done 