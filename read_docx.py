import zipfile
import xml.etree.ElementTree as ET

def read_docx(path):
    try:
        z = zipfile.ZipFile(path)
        xml_content = z.read("word/document.xml")
        tree = ET.fromstring(xml_content)
        ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
        text = "".join(node.text for node in tree.findall(".//w:t", ns) if node.text)
        with open(r"c:\Users\lenovo\Documents\GitHub\seniors\docx_output.txt", "w", encoding="utf-8") as f:
            f.write(text)
    except Exception as e:
        print("Error:", e)

read_docx(r"c:\Users\lenovo\Documents\GitHub\seniors\功能策划.docx")
