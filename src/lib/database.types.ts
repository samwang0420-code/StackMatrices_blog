export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string;
          name: string;
          description: string;
          category_id: string | null;
          category_name: string | null;
          rating: number;
          reviews_count: number;
          logo_url: string | null;
          website_url: string | null;
          deal: string | null;
          has_free_trial: boolean;
          featured: boolean;
          pricing_start: number | null;
          pricing_unit: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category_id?: string | null;
          category_name?: string | null;
          rating?: number;
          reviews_count?: number;
          logo_url?: string | null;
          website_url?: string | null;
          deal?: string | null;
          has_free_trial?: boolean;
          featured?: boolean;
          pricing_start?: number | null;
          pricing_unit?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category_id?: string | null;
          category_name?: string | null;
          rating?: number;
          reviews_count?: number;
          logo_url?: string | null;
          website_url?: string | null;
          deal?: string | null;
          has_free_trial?: boolean;
          featured?: boolean;
          pricing_start?: number | null;
          pricing_unit?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author_name: string;
          author_role: string | null;
          author_avatar: string | null;
          date: string;
          read_time: string | null;
          category: string | null;
          tags: string[] | null;
          image_url: string | null;
          featured: boolean;
          published: boolean;
          view_count: number;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author_name: string;
          author_role?: string | null;
          author_avatar?: string | null;
          date?: string;
          read_time?: string | null;
          category?: string | null;
          tags?: string[] | null;
          image_url?: string | null;
          featured?: boolean;
          published?: boolean;
          view_count?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          author_name?: string;
          author_role?: string | null;
          author_avatar?: string | null;
          date?: string;
          read_time?: string | null;
          category?: string | null;
          tags?: string[] | null;
          image_url?: string | null;
          featured?: boolean;
          published?: boolean;
          view_count?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string | null;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      featured_tools: {
        Row: {
          id: string;
          name: string;
          description: string;
          category_id: string | null;
          category_name: string | null;
          rating: number;
          reviews_count: number;
          logo_url: string | null;
          website_url: string | null;
          deal: string | null;
          has_free_trial: boolean;
          featured: boolean;
          pricing_start: number | null;
          pricing_unit: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      published_articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          author_name: string;
          author_role: string | null;
          author_avatar: string | null;
          date: string;
          read_time: string | null;
          category: string | null;
          tags: string[] | null;
          image_url: string | null;
          featured: boolean;
          published: boolean;
          view_count: number;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
