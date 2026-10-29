package br.com.organicreach.metrics;
import br.com.organicreach.campaign.CampaignRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.net.URI;
import java.time.LocalDate;
import java.util.*;
@RestController @RequestMapping("/api/campaigns/{campaignId}/metrics")
public class CampaignMetricController {
 private final CampaignMetricRepository repository;
 private final CampaignRepository campaigns;
 public CampaignMetricController(CampaignMetricRepository repository,CampaignRepository campaigns){this.repository=repository;this.campaigns=campaigns;}
 public record CreateMetric(@NotBlank @Pattern(regexp="INSTAGRAM|FACEBOOK") String platform,@NotNull LocalDate metricDate,@Min(0) long reach,@Min(0) long impressions,@Min(0) long shares,@Min(0) long profileVisits){}
 private void requireCampaign(UUID id){if(!campaigns.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Campanha não encontrada");}
 @GetMapping public List<CampaignMetric> list(@PathVariable UUID campaignId){requireCampaign(campaignId);return repository.findByCampaignIdOrderByMetricDateDesc(campaignId);}
 @PostMapping public ResponseEntity<CampaignMetric> create(@PathVariable UUID campaignId,@Valid @RequestBody CreateMetric data){
  requireCampaign(campaignId);
  CampaignMetric saved=repository.save(new CampaignMetric(campaignId,data.platform(),data.metricDate(),data.reach(),data.impressions(),data.shares(),data.profileVisits()));
  return ResponseEntity.created(URI.create("/api/campaigns/"+campaignId+"/metrics/"+saved.getId())).body(saved);
 }
}
