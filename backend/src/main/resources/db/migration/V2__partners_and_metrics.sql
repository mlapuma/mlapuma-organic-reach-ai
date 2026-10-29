CREATE TABLE partners (
 id UUID PRIMARY KEY,
 name VARCHAR(160) NOT NULL,
 handle VARCHAR(120),
 platform VARCHAR(20) NOT NULL,
 status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
 created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE campaign_metrics (
 id UUID PRIMARY KEY,
 campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
 platform VARCHAR(20) NOT NULL,
 metric_date DATE NOT NULL,
 reach BIGINT NOT NULL DEFAULT 0 CHECK (reach >= 0),
 impressions BIGINT NOT NULL DEFAULT 0 CHECK (impressions >= 0),
 shares BIGINT NOT NULL DEFAULT 0 CHECK (shares >= 0),
 profile_visits BIGINT NOT NULL DEFAULT 0 CHECK (profile_visits >= 0),
 source VARCHAR(30) NOT NULL DEFAULT 'MANUAL',
 UNIQUE (campaign_id,platform,metric_date,source)
);
