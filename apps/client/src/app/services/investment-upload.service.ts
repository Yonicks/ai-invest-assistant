import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<{ result: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ result: string }>(
      `${environment.apiBaseUrl}/investing/upload`,
      formData
    );
  }
}
