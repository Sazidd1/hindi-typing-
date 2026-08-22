import fs from 'fs';
import path from 'path';

let content = fs.readFileSync(path.join(process.cwd(), 'src/lib/story-generator.ts'), 'utf8');

const s1Additions = `
यहाँ कुछ और विशेष बातें हैं: ३ ६ ७ ८ * . ॅ थ् ळ भ् ष् ब् ण् घ्। 
उसका ३६वाँ जन्मदिन था, और उसने ७, ८ सेब खाए। 
उसने डॉक्टर (ॅ) से कहा कि थ्, ळ, भ्, ष्, ब्, ण्, और घ् जैसे शब्द उसे याद हैं।
* जैसे निशान और . जैसी बिंदियाँ उसे पसंद थीं।
`;

const s2Additions = `
यहाँ कुछ और विशेष बातें हैं: ७ ८ ९ ऋ . ॅ व् ख् थ् श्र ग् ब् ण् ध् घ्। 
७, ८, और ९ बजे के बीच ऋषियों ने पूजा की। 
उसने डॉक्टर (ॅ) से कहा कि व्, ख्, थ्, श्र, ग्, ब्, ण्, ध्, और घ् जैसे अक्षर कठिन हैं।
उसने कहा कि . यहाँ ख़त्म होता है।
`;

content = content.replace(/और इस तरह, वह महान आत्मा हमेशा के लिए अमर हो गई।/, s1Additions + 'और इस तरह, वह महान आत्मा हमेशा के लिए अमर हो गई।');
content = content.replace(/यह कहानी हमें सिखाती है कि सच्ची मित्रता और साहस से बड़ी से बड़ी मुसीबत को भी टाला जा सकता है।/, s2Additions + 'यह कहानी हमें सिखाती है कि सच्ची मित्रता और साहस से बड़ी से बड़ी मुसीबत को भी टाला जा सकता है।');

fs.writeFileSync(path.join(process.cwd(), 'src/lib/story-generator.ts'), content);
console.log('Added missing characters to stories.');
