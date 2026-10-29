package br.com.organicreach.metrics;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface CampaignMetricRepository extends JpaRepository<CampaignMetric,UUID>{
 List<CampaignMetric> findByCampaignIdOrderByMetricDateDesc(UUID campaignId);
}
