-- ==============================================================================
-- TripReels (트립릴스) - Supabase Cloud Database DDL Schema
-- 100% Free PostgreSQL Cloud Schema with Realtime Replication
-- ==============================================================================

-- 1. 여행 단톡방 테이블 (GroupThreads)
CREATE TABLE IF NOT EXISTS public.group_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instagram_thread_id VARCHAR(255) UNIQUE,
    group_slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    destination VARCHAR(100) DEFAULT '오사카',
    badge VARCHAR(100) DEFAULT '인스타 단톡방 연동됨',
    members_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 릴스 데이터 테이블 (Reels)
CREATE TABLE IF NOT EXISTS public.reels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES public.group_threads(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    memo TEXT,
    primary_category VARCHAR(50) NOT NULL, -- 'sightseeing', 'dining', 'shopping', 'transit', 'aviation', 'tips'
    sub_category VARCHAR(50) NOT NULL,     -- 'spot', 'meal', 'snack', 'shoplist', 'fashion', 'pass', 'tip'
    region VARCHAR(100) DEFAULT '오사카 전체',
    lat DECIMAL(10, 6),
    lng DECIMAL(10, 6),
    votes INTEGER DEFAULT 0,
    rating INTEGER DEFAULT 5,
    shared_by VARCHAR(100) DEFAULT '단톡방',
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 인덱스 생성 (조회 속도 극대화)
CREATE INDEX IF NOT EXISTS idx_reels_group_id ON public.reels(group_id);
CREATE INDEX IF NOT EXISTS idx_group_slug ON public.group_threads(group_slug);

-- 4. 실시간 동기화 (Supabase Realtime) 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_threads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reels;

-- 5. Row Level Security (RLS) 정책 설정 (일행 누구나 실시간 읽기/쓰기 허용)
ALTER TABLE public.group_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read group_threads" ON public.group_threads FOR SELECT USING (true);
CREATE POLICY "Allow public insert group_threads" ON public.group_threads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update group_threads" ON public.group_threads FOR UPDATE USING (true);

CREATE POLICY "Allow public read reels" ON public.reels FOR SELECT USING (true);
CREATE POLICY "Allow public insert reels" ON public.reels FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update reels" ON public.reels FOR UPDATE USING (true);
CREATE POLICY "Allow public delete reels" ON public.reels FOR DELETE USING (true);
