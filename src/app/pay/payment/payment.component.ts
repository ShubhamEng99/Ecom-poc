
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import{ init } from 'emailjs-com';
import { DataService } from 'src/services/data.service';
init("user_k7B7C8jEXM3Yd0QDhEuBE");
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
public total=JSON.parse(localStorage.getItem("total"));
public cart:any;
public user=JSON.parse(localStorage.getItem("currentuser"));
public cuser:any;
public name=this.user.name;
public email=this.user.email;
public message:any;

  constructor(private router:Router,private service:DataService) { }

  ngOnInit(): void {
    let msg="";
    this.service.collect.subscribe(data=>{
      this.cart=data;
      console.log(this.cart);
      this.cart.forEach(element => {
        msg+=element.name+" ";
      });
      this.message="You Have Ordered"+" "+ msg+" " + "your subtotal is" +" "+ this.total;
    
    })
  }
  gotocart(){
    this.router.navigateByUrl('cart/checkout');
  }

  home(){
    this.router.navigateByUrl('homepage');
  }
  logout(){
    this.router.navigateByUrl('login');
  }
  gotoproducts(){
    this.router.navigateByUrl('products');
  }
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_fsnvyzn', 'template_fv8bsz4', e.target as HTMLFormElement, 'user_k7B7C8jEXM3Yd0QDhEuBE')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
      this.service.getusers().subscribe(data=>{
        this.cuser=data;
        this.cuser.forEach(element => {
          if(element.id==this.user.id){
            this.user=element
            this.user.cart=[];
            this.service.updateuser(this.user.id,this.user).subscribe(data=>{
              localStorage.setItem("currentuser",JSON.stringify(this.user));
            });
          }
        });
       
        });
        setTimeout(()=>{
         this.home();
        },2000)
  }
}
