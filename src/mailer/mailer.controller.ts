import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mail.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async parseCsv(@UploadedFile() file) {
    console.log('file', file);
    if (!file) throw new Error('No file uploaded');

    const results = [];

    createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => {
        console.log('data', data.TITULAR.toLowerCase());
        return results.push(data);
      })
      .on('end', () => {
        // console.log('results', results);

        return results;
      });
    return { message: 'File uploaded' };
  }
  @Post('send-mail')
  async sendMail() {
    const dto: SendEmailDto = {
      from: {
        name: 'Sociales Club Valle Real',
        address: 'sociales@clubvallereal.com',
      },
      recipients: [
        { name: 'Daniel', address: 'dachb_10@hotmail.com' },
        { name: 'Alberto', address: 'dachb101@gmail.com' },
      ],

      subject: 'Feliz 2024',
      html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Push Email</title>
          <link rel="shortcut icon" href="favicon.ico" />
      
          <style type="text/css">
            table[name="blk_permission"],
            table[name="blk_footer"] {
              display: none;
            }
          </style>
      
          <meta name="googlebot" content="noindex" />
          <meta name="ROBOTS" content="NOINDEX, NOFOLLOW" />
          <link rel="stylesheet" href="/style/dhtmlwindow.css" type="text/css" />
          <script type="text/javascript" src="/script/dhtmlwindow.js">
            /***********************************************
            * DHTML Window Widget- © Dynamic Drive (www.dynamicdrive.com)
            * This notice must stay intact for legal use.
            * Visit www.dynamicdrive.com for full source code
            ***********************************************/
          </script>
          <link rel="stylesheet" href="/style/modal.css" type="text/css" />
          <script type="text/javascript" src="/script/modal.js"></script>
          <script type="text/javascript">
            function show_popup(popup_name, popup_url, popup_title, width, height) {
              var widthpx = width + "px";
              var heightpx = height + "px";
              emailwindow = dhtmlmodal.open(
                popup_name,
                "iframe",
                popup_url,
                popup_title,
                "width=" +
                  widthpx +
                  ",height=" +
                  heightpx +
                  ",center=1,resize=0,scrolling=1"
              );
            }
            function show_modal(popup_name, popup_url, popup_title, width, height) {
              var widthpx = width + "px";
              var heightpx = height + "px";
              emailwindow = dhtmlmodal.open(
                popup_name,
                "iframe",
                popup_url,
                popup_title,
                "width=" +
                  widthpx +
                  ",height=" +
                  heightpx +
                  ",modal=1,center=1,resize=0,scrolling=1"
              );
            }
            var popUpWin = 0;
            function popUpWindow(URLStr, PopUpName, width, height) {
              if (popUpWin) {
                if (!popUpWin.closed) popUpWin.close();
              }
              var left = (screen.width - width) / 2;
              var top = (screen.height - height) / 2;
              popUpWin = open(
                URLStr,
                PopUpName,
                "toolbar=0,location=0,directories=0,status=0,menub	ar=0,scrollbar=0,resizable=0,copyhistory=yes,width=" +
                  width +
                  ",height=" +
                  height +
                  ",left=" +
                  left +
                  ", 	top=" +
                  top +
                  ",screenX=" +
                  left +
                  ",screenY=" +
                  top +
                  ""
              );
            }
          </script>
      
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <style type="text/css">
            /*** BMEMBF Start ***/
            [name="bmeMainBody"] {
              min-height: 1000px;
            }
      
            @media only screen and (max-width: 480px) {
              table.blk,
              table.tblText,
              .bmeHolder,
              .bmeHolder1,
              table.bmeMainColumn {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeImageCard table.bmeCaptionTable td.tblCell {
                padding: 0px 20px 20px 20px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeImageCard
                table.bmeCaptionTable.bmeCaptionTableMobileTop
                td.tblCell {
                padding: 20px 20px 0 20px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.bmeCaptionTable td.tblCell {
                padding: 10px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.tblGtr {
                padding-bottom: 20px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td.blk_container,
              .blk_parent,
              .bmeLeftColumn,
              .bmeRightColumn,
              .bmeColumn1,
              .bmeColumn2,
              .bmeColumn3,
              .bmeBody {
                display: table !important;
                max-width: 600px !important;
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.container-table,
              .bmeheadertext,
              .container-table {
                width: 95% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .mobile-footer,
              .mobile-footer a {
                font-size: 13px !important;
                line-height: 18px !important;
              }
      
              .mobile-footer {
                text-align: center !important;
              }
      
              table.share-tbl {
                padding-bottom: 15px;
                width: 100% !important;
              }
      
              table.share-tbl td {
                display: block !important;
                text-align: center !important;
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td.bmeShareTD,
              td.bmeSocialTD {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td.tdBoxedTextBorder {
                width: auto !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.blk,
              table[name="tblText"],
              .bmeHolder,
              .bmeHolder1,
              table[name="bmeMainColumn"] {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeImageCard table.bmeCaptionTable td[name="tblCell"] {
                padding: 0px 20px 20px 20px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeImageCard
                table.bmeCaptionTable.bmeCaptionTableMobileTop
                td[name="tblCell"] {
                padding: 20px 20px 0 20px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.bmeCaptionTable td[name="tblCell"] {
                padding: 10px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table[name="tblGtr"] {
                padding-bottom: 20px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td.blk_container,
              .blk_parent,
              [name="bmeLeftColumn"],
              [name="bmeRightColumn"],
              [name="bmeColumn1"],
              [name="bmeColumn2"],
              [name="bmeColumn3"],
              [name="bmeBody"] {
                display: table !important;
                max-width: 600px !important;
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table[class="container-table"],
              .bmeheadertext,
              .container-table {
                width: 95% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .mobile-footer,
              .mobile-footer a {
                font-size: 13px !important;
                line-height: 18px !important;
              }
      
              .mobile-footer {
                text-align: center !important;
              }
      
              table[class="share-tbl"] {
                padding-bottom: 15px;
                width: 100% !important;
              }
      
              table[class="share-tbl"] td {
                display: block !important;
                text-align: center !important;
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td[name="bmeShareTD"],
              td[name="bmeSocialTD"] {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td[name="tdBoxedTextBorder"] {
                width: auto !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeImageCard table.bmeImageTable {
                height: auto !important;
                width: 100% !important;
                padding: 20px !important;
                clear: both;
                float: left !important;
                border-collapse: separate;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblInline table.bmeImageTable {
                height: auto !important;
                width: 100% !important;
                padding: 10px !important;
                clear: both;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblInline table.bmeCaptionTable {
                width: 100% !important;
                clear: both;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.bmeImageTable {
                height: auto !important;
                width: 100% !important;
                padding: 10px !important;
                clear: both;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.bmeCaptionTable {
                width: 100% !important;
                clear: both;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.bmeImageContainer {
                width: 100% !important;
                clear: both;
                float: left !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.bmeImageTable td {
                padding: 0px !important;
                height: auto;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td.bmeImageContainerRow {
                padding: 0px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              img.mobile-img-large {
                width: 100% !important;
                height: auto !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              img.bmeRSSImage {
                max-width: 320px;
                height: auto !important;
              }
            }
      
            @media only screen and (min-width: 640px) {
              img.bmeRSSImage {
                max-width: 600px !important;
                height: auto !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .trMargin img {
                height: 10px;
              }
            }
      
            @media only screen and (max-width: 480px) {
              div.bmefooter,
              div.bmeheader {
                display: block !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .tdPart {
                width: 100% !important;
                clear: both;
                float: left !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              table.blk_parent1,
              table.tblPart {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .tblLine {
                min-width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblCenter img {
                margin: 0 auto;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblCenter,
              .bmeMblCenter div,
              .bmeMblCenter span {
                text-align: center !important;
                text-align: -webkit-center !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeNoBr br,
              .bmeImageGutterRow,
              .bmeMblStackCenter .bmeShareItem .tdMblHide {
                display: none !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblInline table.bmeImageTable,
              .bmeMblInline table.bmeCaptionTable,
              td.bmeMblInline {
                clear: none !important;
                width: 50% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblInlineHide,
              .bmeShareItem .trMargin {
                display: none !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblInline table.bmeImageTable img,
              .bmeMblShareCenter.tblContainer.mblSocialContain,
              .bmeMblFollowCenter.tblContainer.mblSocialContain {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblStack > .bmeShareItem {
                width: 100% !important;
                clear: both !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeShareItem {
                padding-top: 10px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .tdPart.bmeMblStackCenter,
              .bmeMblStackCenter .bmeFollowItemIcon {
                padding: 0px !important;
                text-align: center !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblStackCenter > .bmeShareItem {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              td.bmeMblCenter {
                border: 0 none transparent !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeLinkTable.tdPart td {
                padding-left: 0px !important;
                padding-right: 0px !important;
                border: 0px none transparent !important;
                padding-bottom: 15px !important;
                height: auto !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .tdMblHide {
                width: 10px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeShareItemBtn {
                display: table !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblStack td {
                text-align: left !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblStack .bmeFollowItem {
                clear: both !important;
                padding-top: 10px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblStackCenter .bmeFollowItemText {
                padding-left: 5px !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .bmeMblStackCenter .bmeFollowItem {
                clear: both !important;
                align-self: center;
                float: none !important;
                padding-top: 10px;
                margin: 0 auto;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .tdPart > table {
                width: 100% !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .tdPart > table.bmeLinkContainer {
                width: auto !important;
              }
            }
      
            @media only screen and (max-width: 480px) {
              .tdPart.mblStackCenter > table.bmeLinkContainer {
                width: 100% !important;
              }
            }
      
            .blk_parent:first-child,
            .blk_parent {
              float: left;
            }
      
            .blk_parent:last-child {
              float: right;
            }
      
            /*** BMEMBF END ***/
      
            table[name="bmeMainBody"],
            body {
              background-color: #ffffff;
            }
      
            td[name="bmePreHeader"] {
              background-color: transparent;
            }
      
            td[name="bmeHeader"] {
              background: #ffffff;
              background-color: #1fc899;
            }
      
            td[name="bmeBody"],
            table[name="bmeBody"] {
              background-color: #ffffff;
            }
      
            td[name="bmePreFooter"] {
              background-color: #ffffff;
            }
      
            td[name="bmeFooter"] {
              background-color: transparent;
            }
      
            td[name="tblCell"],
            .blk {
              font-family: initial;
              font-weight: normal;
              font-size: initial;
            }
      
            table[name="blk_blank"] td[name="tblCell"] {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 14px;
            }
      
            [name="bmeMainContentParent"] {
              border-color: #808080;
              border-width: 0px;
              border-style: none;
              border-radius: 0px;
              border-collapse: separate;
              border-spacing: 0px;
              overflow: hidden;
            }
      
            [name="bmeMainColumnParent"] {
              border-color: transparent;
              border-width: 0px;
              border-style: none;
              border-radius: 0px;
            }
      
            [name="bmeMainColumn"] {
              border-color: transparent;
              border-width: 0px;
              border-style: none;
              border-radius: 0px;
              border-collapse: separate;
              border-spacing: 0px;
            }
      
            [name="bmeMainContent"] {
              border-color: transparent;
              border-width: 0px;
              border-style: none;
              border-radius: 0px;
              border-collapse: separate;
              border-spacing: 0px;
            }
          </style>
        </head>
      
        <body
          marginheight="0"
          marginwidth="0"
          topmargin="0"
          leftmargin="0"
          style="
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
            min-width: 100%;
          "
        >
          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            name="bmeMainBody"
          >
            <tbody>
              <tr>
                <td width="100%" valign="top" align="center">
                  <table
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    name="bmeMainColumnParentTable"
                  >
                    <tbody>
                      <tr>
                        <td
                          name="bmeMainColumnParent"
                          style="
                            border-collapse: separate;
                            border: 0px none transparent;
                            border-radius: 0px;
                          "
                        >
                          <table
                            name="bmeMainColumn"
                            class="bmeHolder bmeMainColumn"
                            style="
                              max-width: 600px;
                              border-image: initial;
                              border-radius: 0px;
                              border-collapse: separate;
                              border-spacing: 0px;
                              overflow: visible;
                            "
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                            align="center"
                          >
                            <tbody>
                              <tr>
                                <td
                                  width="100%"
                                  class="blk_container bmeHolder"
                                  name="bmePreHeader"
                                  valign="top"
                                  align="center"
                                  style="
                                    color: rgb(102, 102, 102);
                                    border: 0px none transparent;
                                  "
                                  bgcolor=""
                                ></td>
                              </tr>
                              <tr>
                                <td
                                  width="100%"
                                  class="bmeHolder"
                                  valign="top"
                                  align="center"
                                  name="bmeMainContentParent"
                                  style="
                                    border: 0px none rgb(128, 128, 128);
                                    border-radius: 0px;
                                    border-collapse: separate;
                                    border-spacing: 0px;
                                    overflow: hidden;
                                  "
                                >
                                  <table
                                    name="bmeMainContent"
                                    style="
                                      border-radius: 0px;
                                      border-collapse: separate;
                                      border-spacing: 0px;
                                      border: 0px none transparent;
                                    "
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    align="center"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          width="100%"
                                          class="blk_container bmeHolder"
                                          name="bmeHeader"
                                          valign="top"
                                          align="center"
                                          style="
                                            border: 0px none transparent;
                                            background-color: #316767;
                                            color: rgb(56, 56, 56);
                                          "
                                          bgcolor="#1fc899"
                                        >
                                          <div id="dv_3" class="blk_wrapper" style="">
                                            <table
                                              class="blk"
                                              name="blk_image"
                                              width="600"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <table
                                                      width="100%"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="bmeImage"
                                                            style="
                                                              padding: 20px;
                                                              border-collapse: collapse;
                                                            "
                                                            align="center"
                                                          >
                                                            <img
                                                              src="http://clubvallereal.com/logo/logoValleBlanco.png"
                                                              class="mobile-img-large"
                                                              width="200"
                                                              style="
                                                                max-width: 1120px;
                                                                display: block;
                                                                width: 400px;
                                                              "
                                                              alt=""
                                                              border="0"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          width="100%"
                                          class="blk_container bmeHolder bmeBody"
                                          name="bmeBody"
                                          valign="top"
                                          align="center"
                                          style="
                                            color: rgb(56, 56, 56);
                                            border: 0px none transparent;
                                            background-color: rgb(255, 255, 255);
                                          "
                                          bgcolor="#ffffff"
                                        >
                                          <div
                                            id="dv_21"
                                            class="blk_wrapper"
                                            style=""
                                          >
                                            <table
                                              width="600"
                                              cellspacing="0"
                                              cellpadding="0"
                                              border="0"
                                              class="blk"
                                              name="blk_card"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="bmeImageCard"
                                                    align="center"
                                                    style="
                                                      padding-left: 20px;
                                                      padding-right: 20px;
                                                      padding-top: 20px;
                                                      padding-bottom: 20px;
                                                    "
                                                  >
                                                    <table
                                                      width="100%"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            valign="top"
                                                            class="bmeImageContainer"
                                                            style="
                                                              border-collapse: collapse;                                                          
                                                            "
                                                          >
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    valign="top"
                                                                    align="center"
                                                                    class="tdPart"
                                                                  >
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      class="bmeImageTable"
                                                                      width="560"
                                                                      style="
                                                                        padding: 0px !important;
                                                                      "
                                                                      dimension="100%"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            name="bmeImgHolder"
                                                                            align="center"
                                                                            valign="top"
                                                                            height=""
                                                                          >
                                                                            <img
                                                                              src="http://clubvallereal.com/imagenCorreos/feliz2024.jpeg"
                                                                              class="mobile-img-large"
                                                                              width="560"
                                                                              style="
                                                                                max-width: 560px;
                                                                                display: block;
                                                                              "
                                                                              alt=""
                                                                              border="0"
                                                                            />
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          width="100%"
                                          class="blk_container bmeHolder"
                                          name="bmePreFooter"
                                          valign="top"
                                          align="center"
                                          style="
                                            border: 0px none transparent;
                                            background-color: rgb(255, 255, 255);
                                          "
                                          bgcolor="#ffffff"
                                        >
                                          <div
                                            id="dv_14"
                                            class="blk_wrapper"
                                            style=""
                                          >
                                            <table
                                              cellspacing="0"
                                              cellpadding="0"
                                              border="0"
                                              style="background-color: #9c9c9c"
                                              name="blk_social_follow"
                                              width="600"
                                              class="blk"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="tblCellMain"
                                                    align="center"
                                                    style="
                                                      padding-top: 20px;
                                                      padding-bottom: 20px;
                                                      padding-left: 20px;
                                                      padding-right: 20px;
                                                    "
                                                  >
                                                    <table
                                                      class="tblContainer mblSocialContain"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      align="center"
                                                      style="text-align: center"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="tdItemContainer"
                                                            style=""
                                                          >
                                                            <table
                                                              cellspacing="0"
                                                              cellpadding="0"
                                                              border="0"
                                                              class="mblSocialContain"
                                                              style="
                                                                table-layout: auto;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    valign="top"
                                                                    name="bmeSocialTD"
                                                                    class="bmeSocialTD"
                                                                  >
                                                                    <!--[if gte mso 6]></td><td align="left" valign="top"><![endif]-->
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      class="bmeFollowItem"
                                                                      type="facebook"
                                                                      style="
                                                                        float: left;
                                                                        display: block;
                                                                      "
                                                                      align="left"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            align="left"
                                                                            class="bmeFollowItemIcon"
                                                                            gutter="20"
                                                                            width="24"
                                                                            style="
                                                                              padding-right: 20px;
                                                                              height: 20px;
                                                                            "
                                                                          >
                                                                            <a
                                                                              href="https://www.facebook.com/clubvallerealgdl"
                                                                              target="_blank"
                                                                              style="
                                                                                display: inline-block;
                                                                                background-color: rgba(
                                                                                  0,
                                                                                  0,
                                                                                  0,
                                                                                  0
                                                                                );
                                                                                border-radius: 28px;
                                                                                border-style: solid;
                                                                                border-width: 2px;
                                                                                border-color: rgb(
                                                                                  255,
                                                                                  255,
                                                                                  255
                                                                                );
                                                                              "
                                                                              target="_blank"
                                                                              ><img
                                                                                src="https://ui.benchmarkemail.com/images/editor/socialicons/fb_btn.png"
                                                                                alt="Facebook"
                                                                                style="
                                                                                  display: block;
                                                                                  max-width: 114px;
                                                                                "
                                                                                border="0"
                                                                                width="24"
                                                                                height="24"
                                                                            /></a>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <!--[if gte mso 6]></td><td align="left" valign="top"><![endif]-->
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      class="bmeFollowItem"
                                                                      type="twitter"
                                                                      style="
                                                                        float: left;
                                                                        display: block;
                                                                      "
                                                                      align="left"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            align="left"
                                                                            class="bmeFollowItemIcon"
                                                                            gutter="20"
                                                                            width="24"
                                                                            style="
                                                                              padding-right: 20px;
                                                                              height: 20px;
                                                                            "
                                                                          >
                                                                            <a
                                                                              href="https://www.instagram.com/clubvallerealgdl/"
                                                                              target="_blank"
                                                                              style="
                                                                                display: inline-block;
                                                                                background-color: rgba(
                                                                                  0,
                                                                                  0,
                                                                                  0,
                                                                                  0
                                                                                );
                                                                                border-radius: 28px;
                                                                                border-style: solid;
                                                                                border-width: 2px;
                                                                                border-color: rgb(
                                                                                  255,
                                                                                  255,
                                                                                  255
                                                                                );
                                                                              "
                                                                              target="_blank"
                                                                              ><img
                                                                                src="https://ui.benchmarkemail.com/images/editor/socialicons/ig_btn.png"
                                                                                alt="Twitter"
                                                                                style="
                                                                                  display: block;
                                                                                  max-width: 114px;
                                                                                "
                                                                                border="0"
                                                                                width="24"
                                                                                height="24"
                                                                            /></a>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                    <!--[if gte mso 6]></td><td align="left" valign="top"><![endif]-->
                                                                    <table
                                                                      cellspacing="0"
                                                                      cellpadding="0"
                                                                      border="0"
                                                                      class="bmeFollowItem"
                                                                      type="email"
                                                                      style="
                                                                        float: left;
                                                                        display: block;
                                                                      "
                                                                      align="left"
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            align="left"
                                                                            class="bmeFollowItemIcon"
                                                                            gutter="20"
                                                                            width="24"
                                                                            style="
                                                                              height: 20px;
                                                                            "
                                                                          >
                                                                            <a
                                                                              href="https://www.youtube.com/channel/UCtviczopsUToW6TLtQJ8U4w"
                                                                              style="
                                                                                display: inline-block;
                                                                                background-color: rgba(
                                                                                  0,
                                                                                  0,
                                                                                  0,
                                                                                  0
                                                                                );
                                                                                border-radius: 28px;
                                                                                border-style: solid;
                                                                                border-width: 2px;
                                                                                border-color: rgb(
                                                                                  255,
                                                                                  255,
                                                                                  255
                                                                                );
                                                                              "
                                                                              target="_blank"
                                                                              ><img
                                                                                src="https://ui.benchmarkemail.com/images/editor/socialicons/yt_btn.png"
                                                                                alt="Email"
                                                                                style="
                                                                                  display: block;
                                                                                  max-width: 114px;
                                                                                "
                                                                                border="0"
                                                                                width="24"
                                                                                height="24"
                                                                            /></a>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
      `,
    };
    console.log('dto', dto);
    return await this.mailerService.sendMail(dto);
  }
}
