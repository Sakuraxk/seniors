const fs = require('fs');

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
            if (file.endsWith('.tsx') && !file.includes('node_modules')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace inline styles
    content = content.replace(/['"]white['"]/g, "'var(--bg-surface)'");
    content = content.replace(/['"]#fff['"]/g, "'var(--bg-surface)'");
    content = content.replace(/['"]#ffffff['"]/g, "'var(--bg-surface)'");
    
    content = content.replace(/['"]#333(?:333)?['"]/g, "'var(--text-primary)'");
    content = content.replace(/['"]#666(?:666)?['"]/g, "'var(--text-secondary)'");
    content = content.replace(/['"]#888(?:888)?['"]/g, "'var(--text-muted)'");
    content = content.replace(/['"]#999(?:999)?['"]/g, "'var(--text-muted)'");

    // Replace specific light backgrounds in risk cards
    content = content.replace(/['"]#fdfdfd['"]/g, "'var(--bg-card)'");
    content = content.replace(/['"]#fff5f5['"]/g, "'rgba(255, 71, 87, 0.1)'"); // light red for pending risk in both modes
    content = content.replace(/['"]#ffecec['"]/g, "'rgba(255, 71, 87, 0.1)'"); // light red for pending risk in both modes

    // Don't replace color: 'white' if it's meant to be white. But we replaced ALL "white" above.
    // That could break SVG colors or text on primary buttons.
    // Let's be safer and only replace them if they are in specific properties.
    content = original; // Reset for safer replace

    content = content.replace(/background:\s*['"]white['"]/g, "background: 'var(--bg-surface)'");
    content = content.replace(/background:\s*['"]#fff['"]/g, "background: 'var(--bg-surface)'");
    content = content.replace(/background:\s*['"]#ffffff['"]/g, "background: 'var(--bg-surface)'");
    
    content = content.replace(/backgroundColor:\s*['"]white['"]/g, "backgroundColor: 'var(--bg-surface)'");
    content = content.replace(/backgroundColor:\s*['"]#fff['"]/g, "backgroundColor: 'var(--bg-surface)'");

    content = content.replace(/color:\s*['"]#333['"]/g, "color: 'var(--text-primary)'");
    content = content.replace(/color:\s*['"]#666['"]/g, "color: 'var(--text-secondary)'");
    content = content.replace(/color:\s*['"]#888['"]/g, "color: 'var(--text-muted)'");
    content = content.replace(/color:\s*['"]#999['"]/g, "color: 'var(--text-muted)'");

    content = content.replace(/background:\s*['"]#fdfdfd['"]/g, "background: 'var(--bg-card)'");
    content = content.replace(/background:\s*['"]#fff5f5['"]/g, "background: 'rgba(229, 62, 62, 0.1)'");
    content = content.replace(/background:\s*['"]#ffecec['"]/g, "background: 'rgba(229, 62, 62, 0.1)'");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated: ' + file);
        changedFiles++;
    }
});
console.log('Total TSX files changed: ' + changedFiles);
