package br.com.organicreach.metrics;
import jakarta.persistence.*;
import java.util.UUID;
import java.time.LocalDate;
@Entity @Table(name="campaign_metrics")
public class CampaignMetric {
 @Id private UUID id;
 @Column(name="campaign_id",nullable=false) private UUID campaignId;
 private String platform;
 @Column(name="metric_date") private LocalDate metricDate;
 private long reach;
 private long impressions;
 private long shares;
 @Column(name="profile_visits") private long profileVisits;
 private String source;
 protected CampaignMetric(){}
 public CampaignMetric(UUID campaignId,String platform,LocalDate metricDate,long reach,long impressions,long shares,long profileVisits){
  this.id=UUID.randomUUID();this.campaignId=campaignId;this.platform=platform;this.metricDate=metricDate;this.reach=reach;this.impressions=impressions;this.shares=shares;this.profileVisits=profileVisits;this.source="MANUAL";
 }
 public UUID getId(){return id;}
 public UUID getCampaignId(){return campaignId;}
 public String getPlatform(){return platform;}
 public LocalDate getMetricDate(){return metricDate;}
 public long getReach(){return reach;}
 public long getImpressions(){return impressions;}
 public long getShares(){return shares;}
 public long getProfileVisits(){return profileVisits;}
 public String getSource(){return source;}
}
