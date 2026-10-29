package br.com.organicreach.campaign;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
@Entity @Table(name="campaigns")
public class Campaign {
 @Id private UUID id;
 @Column(nullable=false,length=160) private String title;
 @Column(columnDefinition="text") private String description;
 @Column(name="landing_url",length=2048) private String landingUrl;
 @Column(nullable=false,length=20) private String status;
 @Column(name="created_at",nullable=false) private OffsetDateTime createdAt;
 protected Campaign() {}
 public Campaign(String title,String description,String landingUrl) {
  this.id=UUID.randomUUID();this.title=title;this.description=description;
  this.landingUrl=landingUrl;this.status="DRAFT";this.createdAt=OffsetDateTime.now();
 }
 public UUID getId(){return id;}
 public String getTitle(){return title;}
 public String getDescription(){return description;}
 public String getLandingUrl(){return landingUrl;}
 public String getStatus(){return status;}
 public OffsetDateTime getCreatedAt(){return createdAt;}
}
