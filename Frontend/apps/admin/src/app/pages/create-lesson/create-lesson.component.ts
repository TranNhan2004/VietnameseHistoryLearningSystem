import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonFormComponent } from '../../components/lesson-form/lesson-form.component';

@Component({
  selector: 'app-create-lesson',
  imports: [CommonModule, LessonFormComponent],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.css',
})
export class CreateLessonComponent {}
