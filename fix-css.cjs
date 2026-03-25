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
            if (file.endsWith('.css') && !file.includes('index.css') && !file.includes('node_modules')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace backgrounds
    content = content.replace(/background(-color)?:\s*(white|#fff|#ffffff);/gi, 'background$1: var(--bg-surface);');
    
    // Replace dark text colors
    content = content.replace(/color:\s*#333(?:333)?;/gi, 'color: var(--text-primary);');
    content = content.replace(/color:\s*#666(?:666)?;/gi, 'color: var(--text-secondary);');
    content = content.replace(/color:\s*#999(?:999)?;/gi, 'color: var(--text-muted);');
    
    // Replace light background colors
    content = content.replace(/background(-color)?:\s*#f5f5f5;/gi, 'background$1: var(--bg-warm);');
    content = content.replace(/background(-color)?:\s*#f8f9fa;/gi, 'background$1: var(--bg-warm);');
    content = content.replace(/background(-color)?:\s*#fafafa;/gi, 'background$1: var(--bg-warm);');

    // Make borders adapt to themes
    content = content.replace(/border(-[a-z]+)?:\s*1px\s+solid\s+(#eee|#f0f0f0|#e0e0e0|#e2e8f0|rgba\(0,\s*0,\s*0,\s*0\.05\));/gi, 'border$1: 1px solid var(--border-color, rgba(150, 150, 150, 0.2));');
    
    // Hardcoded list item borders
    content = content.replace(/border-bottom:\s*1px\s+dashed\s+(#eee|rgba\(0,0,0,0\.05\));/gi, 'border-bottom: 1px dashed var(--border-color, rgba(150, 150, 150, 0.2));');

    // Box shadows that assume light mode
    // Just leave shadows alone or replace specific ones if needed. Not doing shadows for now.

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated: ' + file);
        changedFiles++;
    }
});
console.log('Total files changed: ' + changedFiles);
