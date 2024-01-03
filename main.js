// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum,
        dna,

        //change a random base listed in this.dna
        mutate() {
            //pick a random item from the dna list
            let randomBase = Math.floor(Math.random() * this.dna.length);
            let newBase = returnRandBase();
            this.dna[randomBase] === newBase ? newBase = returnRandBase() : this.dna[randomBase] = newBase;

            return this.dna;
        },

        //compare input dna to this.dna looking for matches at each index 
        compareDNA(obj) {
            let res = 0;
            for (let i = 0; i < this.dna.length; i++) {
                if (obj.dna[i] === this.dna[i]) {
                    res++;
                }
            }
            let common = (res / this.dna.length) * 100;
            common % 1 === 0 ?
                console.log(`Species Numbers ${this.specimenNum} and ${obj.specimenNum} have ${common}% of DNA in common.`) :
                console.log(`Species Numbers ${this.specimenNum} and ${obj.specimenNum} have ${common.toFixed(2)}% of DNA in common.`);
        },

        //determine if specimen will survive based on criteria provided
        willLikelySurvive() {
            let count = 0;
            for (i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === 'C' || this.dna[i] === 'G') {
                    count++;
                }
            }
            let chance = (count / this.dna.length) * 100;
            if (chance >= 60) {
                return true;
            } else {
                return false;
            }
        }
    }
}

//create a sample set of 30 specimens that will survive based on criteria provided (and determined by willLikelySurvive())
const sampleSet = () => {

    let survivors = [];
    let counter = 1;
    while (survivors.length < 30) {
        let specimen = pAequorFactory(counter, mockUpStrand());
        if (specimen.willLikelySurvive()) {
            survivors.push(specimen);
            counter++;
        }
    }
    return survivors;
}

//let testObj = pAequorFactory(2, mockUpStrand());
//let testObj2 = pAequorFactory(3, mockUpStrand());
//testObj.compareDNA(testObj2);
//console.log(pAequorFactory(1, mockUpStrand()).willLikelySurvive());
//console.log(sampleSet());