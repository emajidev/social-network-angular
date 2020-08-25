import { TestBed } from '@angular/core/testing';

import { FavoriteArticlesService } from './favorite-articles.service';

describe('FavoriteArticlesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteArticlesService = TestBed.get(FavoriteArticlesService);
    expect(service).toBeTruthy();
  });
});
