import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup ,Validators} from '@angular/forms';
import { ApiUserService } from '../api-user.service';
import { PendingPost } from '../../shared/model/pendingPost';
import { Router } from '@angular/router';
import { NotificationDialogComponent } from '../../shared/notification-dialog/notification-dialog.component';
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
import { name } from '@cloudinary/url-gen/actions/namedTransformation';


@Component({
  selector: 'app-subrice-service',
  standalone: true,
  imports: [CKEditorModule,CommonModule,ReactiveFormsModule,NotificationDialogComponent],
  templateUrl: './subrice-service.component.html',
  styleUrl: './subrice-service.component.scss'
})
export class SubriceServiceComponent {

  @ViewChild('editorToolbarElement') private editorToolbar!: ElementRef<HTMLDivElement>;
  constructor(private router:Router,private changeDetector: ChangeDetectorRef, private fb:FormBuilder, private userservice:ApiUserService){}

  postForm:FormGroup = this.fb.group({})


	showDialog: boolean = false;
	notificationMessage: string = '';
	linkrouter:string=''
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
				'<h2>Congratulations on setting up CKEditor 5!',
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
		this.postForm=this.fb.group({
			kindService:['', [Validators.required]],
			name: ['', [Validators.required]], 
			location: ['',[Validators.required]],
			number: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]],
			email:['',[Validators.required, Validators.email]],
			img:[[],[Validators.required]],
   			introduce:['',[Validators.required]],
		})
	}

	onSubmitForm(){
		if(this.postForm.valid){
		  this.subbriceService()
		}else{
		  alert('dữ liệu không hợp lệ vui lòng kiểm tra lại')
		}
	  }

	onFileChange(event: any) {
		const files: FileList = event.target.files;
		const fileArray: File[] = Array.from(files);
		var arrImg=fileArray.map ((item)=>{
			return 'assets/'+item.name
		})
		this.postForm.patchValue({
			img: arrImg
		});
	}

	subbriceService(){
		const data = this.postForm.value
		this.userservice.subriceService('http://localhost:3000/pendingPost/add',data)
		.subscribe (data=>{
			if(typeof data ==='object'){
				this.showDialog=true
				this.notificationMessage='Đã gửi yêu thành công vui lòng chờ phê duyệt'
				this.linkrouter='/home/user'
			}
		})
	}

}
