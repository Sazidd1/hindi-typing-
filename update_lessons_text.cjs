const fs = require('fs');

const map = { 'f':'ि', 'j':'र', 'd':'क', 'k':'ा', 's':'े', 'l':'स', 'a':'ं', ';':'य', 'g':'ह', 'h':'ी', 'r':'त', 'u':'न', 'e':'म', 'i':'प', 'w':'ू', 'o':'व', 'q':'ु', 'p':'च', 't':'ज', 'y':'ल', 'c':'ब', 'n':'द', 'x':'ग', 'm':'उ', 'v':'अ', 'z':'्र', ',':'ए', '.':'ण्', '/':'ध्', 'b':'इ', ' ':' ' };

function gen(keys) {
    let arr = [];
    for(let i=0; i<120; i++) {
        let w = '';
        for(let j=0; j<5; j++) w += map[keys[Math.floor(Math.random() * keys.length)]];
        arr.push(w);
    }
    return arr.join(' ');
}

const chapters = {
    'ch1': ['f','j'],
    'ch2': ['d','k'],
    'ch3': ['s','l'],
    'ch4': ['a',';'],
    'ch5': ['a','s','d','f'],
    'ch6': ['j','k','l',';'],
    'ch7': ['g','h'],
    'ch8': ['a','s','d','f','g'],
    'ch9': ['j','k','l',';','h'],
    'ch10': ['a','s','d','f','g','h','j','k','l',';'],
    
    'ch12': ['r','u'],
    'ch13': ['e','i'],
    'ch14': ['w','o'],
    'ch15': ['q','p'],
    'ch16': ['q','w','e','r'],
    'ch17': ['u','i','o','p'],
    'ch18': ['t','y'],
    'ch19': ['q','w','e','r','t'],
    'ch20': ['y','u','i','o','p'],
    'ch21': ['q','w','e','r','t','y','u','i','o','p'],
    
    'ch25': ['v','m'],
    'ch26': ['c',','],
    'ch27': ['x','.'],
    'ch28': ['z','/'],
    'ch29': ['z','/','x','c'],
    'ch30': ['m',',','.','/'],
    'ch31': ['b','n'],
    'ch32': ['z','/','x','c','b'],
    'ch33': ['m',',','.','/','n'],
    'ch34': ['z','x','c','v','b','n','m',',','.','/']
};

let content = fs.readFileSync('./src/lib/typing-data.ts', 'utf8');

for (const [slug, keys] of Object.entries(chapters)) {
    const newText = gen(keys);
    // Find the lesson and replace its text.
    // The regex matches the text property specifically for this slug
    const regex = new RegExp(`({ slug: '${slug}', [^}]*text: ')([^']+)(' })`, 'g');
    content = content.replace(regex, `$1${newText}$3`);
}

fs.writeFileSync('./src/lib/typing-data.ts', content);
console.log('Updated typing-data.ts');
