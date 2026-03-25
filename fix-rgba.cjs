const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.css') && !file.includes('node_modules')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace background rgba white with var(--bg-glass) or var(--bg-card)
    content = content.replace(/background(-color)?:\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.[0-9]+\s*\);/gi, 'background$1: var(--bg-glass);');
    
    // Replace background linear gradients using rgba white
    content = content.replace(/background:\s*linear-gradient\([^;]*rgba\(\s*255\s*,\s*255\s*,\s*255[^;]*\);/gi, 'background: linear-gradient(135deg, var(--bg-card), var(--bg-glass));');
    
    // Replace border rgba white
    content = content.replace(/border(-[a-z]+)?:\s*1px\s+solid\s+rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.[0-9]+\s*\);/gi, 'border$1: 1px solid var(--bg-glass-border);');
    content = content.replace(/border(-[a-z]+)?:\s*2px\s+solid\s+rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.[0-9]+\s*\);/gi, 'border$1: 2px solid var(--bg-glass-border);');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated: ' + file);
        changedFiles++;
    }
});
console.log('Total files changed: ' + changedFiles);
