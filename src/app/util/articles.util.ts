import { Article } from "../interfaces/article.interface";

export class ArticlesUtil {

    public findArticle( articles: Article[], key, value) {
        return articles.findIndex((article)=> article[key] == value)
    }

    public removeArticleFromList( id_article, list): any[] {
        for(var i = 0; i < list.length; i++) {
            if(list[i].id_article === id_article) {
              list.splice(i, 1);
              break;
            }
        }
        return list;
    }
}