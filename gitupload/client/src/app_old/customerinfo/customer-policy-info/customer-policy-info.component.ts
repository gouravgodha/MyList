import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
// import { VideoCaptureComponent } from '../../videosignature/video-capture/video-capture.component'

import { CustomerService } from "../../services/customerService";
import { FormTypeService } from "../../services/formTypeService";

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-customer-policy-info',
  templateUrl: './customer-policy-info.component.html',
  styleUrls: ['./customer-policy-info.component.scss'],
   providers: [CustomerService,FormTypeService]
})
export class CustomerPolicyInfoComponent implements OnInit {

    signatureFileName:any;
    Customerupdate : FormGroup;

@ViewChild(SignaturePad) signaturePad: SignaturePad;

private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  video_recording:any = false;


   ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  drawfinish(){
      console.log("draw finish");
       this.signaturePad.clear();
  }

  drawundo(){
      let data = this.signaturePad.toData();
      if (data) {
          data.pop(); // remove the last dot or line
          this.signaturePad.fromData(data);
      }
  }

  startrecording(){
      this.video_recording = true;
  }

 customerEditForm : FormGroup;
    formTypeList: any = [];
    


    selectedDocument: any;

    customer_id: any;
    customer_data: any={customer_first_name:''};

    constructor(
        private sanitizer:DomSanitizer,
  	    private customerService: CustomerService,
  	    private formTypeService: FormTypeService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    uploadSignature(){
        let signatureData: any = {
            signature: ''
        };    
        
        // this.signaturePad.removeBlanks();
        // signatureData.signature = this.signaturePad.toDataURL();
        try{
            signatureData.signature = this.obtainCroppedImage();
        }catch(error){
            console.log("exception is",error);            
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Please upload correct signature!', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            return false;

        }
        

        console.log("The type of signature data is ", typeof(signatureData.signature));

        this.customerService.uploadSignature(signatureData).subscribe(res => {            
            console.log("Response received from userService.uploadSignature method", res);    
            this.signatureFileName = res.data; 

            if (res.status == 200) {

                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Signature uploaded Successfully.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-success alert-with-icon",
                    positionClass: 'toast-top-center'
                });
                this.signaturePad.clear();
            } else {
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Signature upload failed, please try again.', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Signature upload failed, please try again.', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center' 
            });
        });

    }

    
    ngOnInit() {
  	    console.log("Customer edit component loaded!");
        this.initForm();
        // this.fetchFormTypes();
        this.route.params.subscribe(params => {
            this.getCustomer(params['customer_id']);
            this.customer_id = params['customer_id'];
        })
    }
  
    getCustomer(customer_id){
        this.customerService.getCustomer(customer_id).subscribe(res => {
                console.log("Response received from the customerService.getCustomer service method", res);
                if (res.status == 200) {
                    console.log("Response is", res);
                    this.customer_data = res.data;
                    this.customerEditForm.controls["customer_first_name"].setValue(this.customer_data.customer_first_name);
                    this.customerEditForm.controls["customer_last_name"].setValue(this.customer_data.customer_last_name);
                    this.customerEditForm.controls["customer_email"].setValue(this.customer_data.customer_email);
                    this.customerEditForm.controls["customer_phone"].setValue(this.customer_data.customer_phone);
                    this.customerEditForm.controls["customer_policy_number"].setValue(this.customer_data.customer_policy_number);
                    this.customerEditForm.controls["customer_country"].setValue(this.customer_data.customer_country);
                    this.customerEditForm.controls["customer_state"].setValue(this.customer_data.customer_state);
                    this.customerEditForm.controls["customer_city"].setValue(this.customer_data.customer_city);
                    this.customerEditForm.controls["customer_address"].setValue(this.customer_data.customer_address);
                    this.customerEditForm.controls["customer_status"].setValue(this.customer_data.customer_status);
                    this.customerEditForm.controls["customer_form_id"].setValue(this.customer_data.customer_form_id);
                     this.customerEditForm.controls["form_statement"].setValue(this.customer_data.form_types_master.form_statement);
                    // this.customerEditForm.controls["customer_document_filename"].setValue(this.customer_data.customer_document_filename);
                } else {
                    console.log("Form type not added successfully!");
                    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Customer Data, please try again..', '', {
                        timeOut: 2000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-error alert-with-icon",
                        positionClass: 'toast-top-center'
                    });
                }
            }, err => {
                console.log("An error occured", err);  
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Customer Data, please try again..', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
        });
    }

    initForm() {
        this.customerEditForm = this.formBuilder.group({
            customer_first_name: ["", Validators.required],
            customer_last_name: ["", Validators.required],
            customer_email: ["", Validators.required],
            customer_phone: ["", Validators.required],
            customer_policy_number: ["", Validators.required],
            customer_country: ["", Validators.required],
            customer_state: ["", Validators.required],
            customer_city: ["", Validators.required],
            customer_address: ["", Validators.required],
            customer_status: ["", Validators.required],
            customer_form_id: ["", Validators.required],
            form_statement: ["", Validators.required],
            // customer_document_filename: ["", Validators.required]
        });
        console.log("Customer form ",this.customerEditForm);
    }

    fetchFormTypes(){
        this.formTypeService.getFormTypes().subscribe(res => {
            console.log("Response received from the formTypeService.getFormTypes method", res);
            if (res.status == 200) {
                this.formTypeList = res.data;
            } else {
                this.formTypeList = [];
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Form Types, please try again..', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            }
        }, err => {
            this.formTypeList = [];            
            console.log("An error occured", err);
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>An error occured while fetching the Form Types, please try again..', '', {
                timeOut: 2000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-error alert-with-icon",
                positionClass: 'toast-top-center'
            });
        });
    }

    OnFileChange(event) {
        console.log("Event value is", event);
        if (event.target.files.length > 0) {
            this.selectedDocument = event.target.files[0];
            console.log("On change file",this.selectedDocument);
        }
    }

    viewDocument(url){        
        return this.sanitizer.bypassSecurityTrustUrl(url);
        // let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.customer_data.docFilePath);
        // window.location.(sanitizedUrl);
    }

     obtainCroppedImage() {
        let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
        let croppedCanvas:HTMLCanvasElement = document.createElement('canvas');
        let croppedCtx:CanvasRenderingContext2D = croppedCanvas.getContext("2d");

        croppedCanvas.width = canvas.width;
        croppedCanvas.height = canvas.height;
        croppedCtx.drawImage(canvas, 0, 0);

        let w = croppedCanvas.width;
        let h = croppedCanvas.height;
        let pix = {x:[], y:[]};
        let imageData = croppedCtx.getImageData(0,0,w,h);
        let index = 0;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                index = (y * w + x) * 4;
                if (imageData.data[index+3] > 0) {
                    pix.x.push(x);
                    pix.y.push(y);
                }
            }
        }

        pix.x.sort((a,b) => a-b);
        pix.y.sort((a,b) => a-b);
        let n = pix.x.length-1;

        w = pix.x[n] - pix.x[0];
        h = pix.y[n] - pix.y[0];
        var cut = croppedCtx.getImageData(pix.x[0], pix.y[0], w, h);

        croppedCanvas.width = w;
        croppedCanvas.height = h;
        croppedCtx.putImageData(cut, 0, 0);

        return croppedCanvas.toDataURL();
    }

    updatecustomerdata(){

        let signatureData: any = {
            signature: ''
        };    
        
        // this.signaturePad.removeBlanks();
        // signatureData.signature = this.signaturePad.toDataURL();
        try{
            signatureData.signature = this.obtainCroppedImage();
        }catch(error){
            console.log("exception is",error);            
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Please upload correct signature!', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            return false;

        }

        if(this.video_recording ==false){
          // console.log("exception is",error1);            
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Please upload Recorded video', '', {
                    timeOut: 2000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-error alert-with-icon",
                    positionClass: 'toast-top-center'
                });
            return false;  
        }

       
        

        console.log("The type of signature data is ", typeof(signatureData.signature));

        this.customerService.uploadSignature(signatureData).subscribe(res => {            
            console.log("Response received from userService.uploadSignature method", res);    
            this.signatureFileName = res.data; 
            //let date = params['startdate'];

            console.log("signature image is",  this.signatureFileName);
          //  return false;
       console.log("Trying to update customer signature!");

        
        let customerdata = {
            
            customer_signature_image: this.signatureFileName,
            customer_id: this.customer_id,
            customer_document_status :'SIGNED'

            // business_status: this.Customerupdate.controls["business_status"].value
        }
        console.log(customerdata);
        this.customerService.updateCustomerinfo(customerdata).subscribe(res => {
            console.log("Response received from the Customerinfo type service", res);
            if (res.status == 200) {                
                console.log("Response is", res);
                this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Customer Info Added Successfully.', '', {
                   timeOut: 2000,
                   closeButton: true,
                   enableHtml: true,
                   toastClass: "alert alert-success alert-with-icon",
                   positionClass: 'toast-top-center'
                 });
                   //this.router.navigate(['/businesstype'])


            } else {
              console.log("CustomerInfo not added successfully!");
            }
        }, err => {          

            console.log("An error occured", err);         


        });
    })

    }
    // updateCustomer() {
    //     console.log("Update Customer called.", this.customerEditForm);
    //     console.log("this", this);
    //     console.log("Customer id", this.customer_id);

    //     let editedCustomer = new FormData();

    //     editedCustomer.append('customer_id', this.customer_id);
    //     editedCustomer.append('customer_first_name', this.customerEditForm.controls["customer_first_name"].value);
    //     editedCustomer.append('customer_last_name', this.customerEditForm.controls["customer_last_name"].value);
    //     editedCustomer.append('customer_email', this.customerEditForm.controls["customer_email"].value);
    //     editedCustomer.append('customer_phone', this.customerEditForm.controls["customer_phone"].value);
    //     editedCustomer.append('customer_policy_number', this.customerEditForm.controls["customer_policy_number"].value);
    //     editedCustomer.append('customer_country', this.customerEditForm.controls["customer_country"].value);
    //     editedCustomer.append('customer_state', this.customerEditForm.controls["customer_state"].value);
    //     editedCustomer.append('customer_city', this.customerEditForm.controls["customer_city"].value);
    //     editedCustomer.append('customer_address', this.customerEditForm.controls["customer_address"].value);
    //     editedCustomer.append('customer_status', this.customerEditForm.controls["customer_status"].value);
    //     editedCustomer.append('customer_form_id', this.customerEditForm.controls["customer_form_id"].value);
    //     // editedCustomer.append('customer_document_filename', this.selectedDocument);

    //     console.log("The edited customer is", editedCustomer);
        
    //     this.customerService.updateCustomer(editedCustomer).subscribe(res => {
    //         console.log("Response received from the customerService.updateCustomer service Method", res);
    //         if (res.status == 200) {                
    //             this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Customer Updated Successfully.', '', {
    //                 timeOut: 2000,
    //                 closeButton: true,
    //                 enableHtml: true,
    //                 toastClass: "alert alert-success alert-with-icon",
    //                 positionClass: 'toast-top-center'
    //             });
    //             this.router.navigate(['/customer']);
    //         } else {
    //             this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Customer Update failed.', '', {
    //                 timeOut: 2000,
    //                 closeButton: true,
    //                 enableHtml: true,
    //                 toastClass: "alert alert-error alert-with-icon",
    //                 positionClass: 'toast-top-center'
    //             });
    //         }
    //     }, err => {          
    //         this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>Customer Update failed.', '', {
    //             timeOut: 2000,
    //             closeButton: true,
    //             enableHtml: true,
    //             toastClass: "alert alert-error alert-with-icon",
    //             positionClass: 'toast-top-center'
    //         });
    //     });
    // }    
}