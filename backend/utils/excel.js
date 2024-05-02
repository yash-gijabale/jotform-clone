import ExcelJS from 'exceljs'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: 'dui8bnzt6',
    api_key: '516331636988959',
    api_secret: '3xElcHUsRIEsxs3wtpYesE9XEtw',
});


export const createExel = async (res, form) => {

    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('submission', {
            pageSetup: { paperSize: 9, orientation: 'landscape' }
        });


        let sheetColmuns = [];

        form.columns.forEach(element => {
            sheetColmuns.push({
                header: element.name , key: element.id,  width: 32 
            })
        });

        worksheet.columns = sheetColmuns

        form.submissions.forEach(submission =>{
            let responce = submission.responce
            let data = {}
            sheetColmuns.forEach(col =>{
                data[col.key] = responce[col.key] ? responce[col.key] : ''
            })
            worksheet.addRow(data);
            data = {}
        })

        worksheet.getCell('B1').border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };

        worksheet.getRow(1).font = {family: 4, size: 13, bold: true };
        worksheet.getRow(1).height = 30
        worksheet.getRow(1).border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };

        console.log(worksheet.columns)

        
        const data = await workbook.xlsx.writeFile(`./${form.name}.xlsx`)
        console.log(data)
        var fileName = `./${form.name}.xlsx`;
        const result = await cloudinary.uploader.upload(fileName, {
            resource_type: "raw", 
            folder: "jotform", 
            use_filename: true,
            unique_filename: false
        });

        fs.unlink(fileName, function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
       })

        res.status(200).json({
            data: result
        })

    } catch (error) {
        console.log(error)
    }


}

