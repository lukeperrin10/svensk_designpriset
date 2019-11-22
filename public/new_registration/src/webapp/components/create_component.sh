#!/bin/bash
cd $(dirname "$0")
FileName="$1"
Name="$2"
mkdir $FileName
cd $FileName

cat ../template_component/template_component.tsx | sed s/TemplateComponent/${Name}/ | sed s/template_component/${FileName}/ > ${FileName}.tsx
cat ../template_component/index.ts | sed s/template_component/${FileName}/ | sed s/TemplateComponent/${Name}/ > index.ts
touch ${FileName}.module.css

echo "Create new component"