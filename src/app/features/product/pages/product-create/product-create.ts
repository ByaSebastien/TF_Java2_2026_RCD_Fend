import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-product-create',
  styleUrl: './product-create.scss',
  templateUrl: './product-create.html',
})
export class ProductCreate {
  private readonly _fb = inject(FormBuilder);
  private readonly _productService = inject(ProductService);
  private readonly _router = inject(Router);

  readonly sending = signal(false);
  readonly error = signal<string | null>(null);

  form = this._fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.error.set(null);

    this._productService.create(this.form.getRawValue()).subscribe({
      next: () => this._router.navigate(['/product']),
      error: () => {
        this.error.set('Erreur lors de la création du produit');
        this.sending.set(false);
      },
    });
  }
}
