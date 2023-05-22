function transliterate(word){
    if(typeof word === 'undefined' || word === '') {
        return 'unknown name';
    }

    word = word.toLowerCase()
    let answer = "", a = {};

    a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";
    a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";
    a["з"]="z";a["х"]="h";a["ъ"]="";a["ф"]="f";a["ы"]="i";
    a["в"]="v";a["а"]="a";a["п"]="p"; a["р"]="r";a["о"]="o";
    a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";a["я"]="ya";
    a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";
    a["ь"]="";a["б"]="b";a["ю"]="yu";a[" "]="-";a[","]="";
    a["."]="";a["("]="-";a[")"]="-";a["["]="-";a["]"]="-";
    a["}"]="-";a["{"]="-";a["*"]="-";a["\""]="-";a["'"]="-";

    for (let i in word){
        if (word.hasOwnProperty(i)) {
            if (a[word[i]] === undefined){
                answer += word[i];
            } else {
                answer += a[word[i]];
            }
        }
    }
    return answer;
}

module.exports = transliterate
