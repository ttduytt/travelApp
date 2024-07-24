import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Post } from '../../../shared/model/postModel';
import { Services } from '../../service';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../shared/model/categoryModel';
import { Router } from '@angular/router';

import {
	DecoupledEditor,
	AccessibilityHelp,
	Alignment,
	AutoImage,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	ImageBlock,
	ImageCaption,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	Indent,
	Italic,
	Link,
	List,
	Paragraph,
	SelectAll,
	Underline,
	Undo,
	type EditorConfig
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule,CommonModule, CKEditorModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

 
  @ViewChild('editorToolbarElement') private editorToolbar!: ElementRef<HTMLDivElement>;

  postForm: FormGroup=this.fb.group({});
  imageUrl: string | ArrayBuffer | null = null;
  categorys : Category[]=[]
  isdark:boolean=false
  isclose:boolean=false
  file :File | null=null
  isLoading=false
  constructor(private fb: FormBuilder, private service:Services, private router:Router,private changeDetector: ChangeDetectorRef) {}

  public isLayoutReady = false;
	public Editor = DecoupledEditor;
	public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
	public ngAfterViewInit(): void {
		this.config = {
			toolbar: {
				items: [
					'undo',
					'redo',
					'|',
					'selectAll',
					'|',
					'fontSize',
					'fontFamily',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'underline',
					'|',
					'link',
					'insertImageViaUrl',
					'blockQuote',
					'|',
					'alignment',
					'|',
					'bulletedList',
					'numberedList',
					'indent',
					'outdent',
					'|',
					'accessibilityHelp'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				AccessibilityHelp,
				Alignment,
				AutoImage,
				Autosave,
				BlockQuote,
				Bold,
				Essentials,
				FontBackgroundColor,
				FontColor,
				FontFamily,
				FontSize,
				GeneralHtmlSupport,
				ImageBlock,
				ImageCaption,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageToolbar,
				Indent,
				Italic,
				Link,
				List,
				Paragraph,
				SelectAll,
				Underline,
				Undo
			],
			fontFamily: {
				supportAllValues: true
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true,
						attributes: true,
						classes: true
					}
				]
			},
			image: {
				toolbar: [
					'toggleImageCaption',
					'imageTextAlternative',
					'|',
					'imageStyle:alignBlockLeft',
					'imageStyle:block',
					'imageStyle:alignBlockRight',
					'|',
					'resizeImage'
				],
				styles: {
					options: ['alignBlockLeft', 'block', 'alignBlockRight']
				}
			},
			initialData:
				'<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			placeholder: 'Type or paste your content here!'
		};

		this.isLayoutReady = true;
		this.changeDetector.detectChanges();
	}

	public onReady(editor: DecoupledEditor): void {
		Array.from(this.editorToolbar.nativeElement.children).forEach(child => child.remove());

		this.editorToolbar.nativeElement.appendChild(editor.ui.view.toolbar.element!);
	}


  

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
  }

	ngOnInit() {

	this.getCategory()
	
		this.postForm = this.fb.group({
			title: ['', [Validators.required]],
			avatar: ['', [Validators.required]],
			category: ['', [Validators.required]],
			content: ['', [Validators.required]],
		});
	}

	onSubmitForm(){
		if(this.postForm.valid){
			// trong hàm upload có gọi hàm thêm post
			this.upLoadAndGetUrl()
		}else{
			console.log(this.postForm)
			alert('dữ liệu không hợp lệ vui lòng kiểm tra lại')
		}
	}

  getCategory(){
    this.service.getAllCategory('http://localhost:3000/category/getAll')
    .subscribe((data)=>{
        this.categorys=data
    })
  }



onFileSelected(event:any){
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]){
  	this.file= input.files[0]
	  this.postForm.patchValue({avatar:this.file})
  
  }else {
    console.error('No file selected or input.files is undefined');
  }

}

 upLoadAndGetUrl(){
	if(this.file){
		const formData = new FormData();
		formData.append('file', this.file);
		formData.append('upload_preset', 'ml_default'); 
		this.isLoading=true
		this.service.UploadImg('https://api.cloudinary.com/v1_1/dua4jdiah/upload', formData)
		.subscribe((response:any)=>{
			this.file=response.secure_url
			this.postForm.patchValue({avatar:this.file})

			// gọi hàm thêm nếu upload ảnh thành công
			this.createPost()
		})
	}
 }

 createPost() {
    const postData: Post = this.postForm.value;
    this.service.addPost('http://localhost:3000/post/add', postData)
    .subscribe(
      (response) => {
       this.router.navigateByUrl('post/listPost')
      },
    );
  }


}
