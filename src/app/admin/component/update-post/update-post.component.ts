import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { HeaderComponent } from '../header/header.component';
import { Services } from '../../service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../shared/model/categoryModel';

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
  selector: 'app-update-post',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule,FormsModule,CommonModule,CKEditorModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss'
})
export class UpdatePostComponent  {
  categorys: Category[]=[]
  title:string =''
  post :any
  isdark:boolean=false
  isclose:boolean=false
  file :File | null=null
  @ViewChild('editorToolbarElement') private editorToolbar!: ElementRef<HTMLDivElement>;

  constructor( private service:Services,private router:Router,private changeDetector: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation(); 
    if (navigation?.extras.state) {
      this.post = navigation.extras.state['post'];
      this.title =this.post.title
    }else{
      console.log('ewfwe')
    }
  }


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
				options: [10, 12, 14, 'default', 18, 20, 22,24,26],
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


 
  ngOnInit(){
    this.getCategory()
  }

  handleData(data: {close:boolean, dark:boolean}){
    this.isclose= data.close
    this.isdark=data.dark
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
	}else {
	  console.error('No file selected or input.files is undefined');
	}
  
  }

  upLoadAndGetUrl(idPost:string){
	if(this.file){
		const formData = new FormData();
		formData.append('file', this.file);
		formData.append('upload_preset', 'ml_default'); 
		this.service.UploadImg('https://api.cloudinary.com/v1_1/dua4jdiah/upload', formData)
		.subscribe((response:any)=>{
			this.file=response.secure_url
			this.post.avatar=this.file

			// gọi hàm sửa nếu upload ảnh thành công
			this.updatePost(idPost)
		})
	}
 }

  updatePost (id:string){
    this.service.updatePost(`http://localhost:3000/post/update/${id}`, this.post)
    .subscribe((response)=>{
		this.router.navigateByUrl('post/listPost')
    })
  }

}
