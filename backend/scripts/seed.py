"""Seed script for PolicyCompare backend."""
from sqlmodel import Session, select, SQLModel
from app.database import engine
from app.models import Policy
from datetime import date

SAMPLE = [
    {
        "title": "Health Shield Plus",
        "description": "Comprehensive health insurance covering hospitalization, surgery, and preventive care.",
        "category": "Health Insurance",
        "effective_date": date(2024, 1, 1),
        "issuer": "HealthCare Co.",
        "tags": ["health", "medical", "hospitalization"],
        "sections": [
            {"title": "Coverage", "content": "Hospitalization, pre/post hospitalization, daycare."},
            {"title": "Benefits", "content": "Annual health checkups and maternity cover."}
        ],
        "last_updated": "2024-01-01",
        "source_url": "https://example.com/policies/health-shield-plus"
    },
    {
        "title": "Wellness Family Care",
        "description": "Family health plan with outpatient and critical illness coverage.",
        "category": "Health Insurance",
        "effective_date": date(2024, 2, 1),
        "issuer": "FamilyHealth Insurance",
        "tags": ["family", "wellness", "critical illness"],
        "sections": [
            {"title": "Family Cover", "content": "Covers up to 5 family members with cashless hospitalization."},
            {"title": "Wellness", "content": "Annual health check-ups and wellness discounts."}
        ],
        "last_updated": "2024-02-01",
        "source_url": "https://example.com/policies/wellness-family-care"
    },
    {
        "title": "Secure Term Plan",
        "description": "Affordable term life insurance for financial protection of your family.",
        "category": "Term Insurance",
        "effective_date": date(2023, 8, 1),
        "issuer": "LifeSecure",
        "tags": ["life", "term", "protection"],
        "sections": [
            {"title": "Sum Assured", "content": "Fixed payout on death within policy term."},
            {"title": "Policy Term", "content": "10 to 30 years coverage options."}
        ],
        "last_updated": "2023-08-01",
        "source_url": "https://example.com/policies/secure-term-plan"
    },
    {
        "title": "Family Income Shield",
        "description": "Term cover with income replacement and accidental benefit add-ons.",
        "category": "Term Insurance",
        "effective_date": date(2024, 3, 1),
        "issuer": "SecureLife",
        "tags": ["life", "income", "term"],
        "sections": [
            {"title": "Accidental Benefit", "content": "Additional payout on accidental death."},
            {"title": "Premium Waiver", "content": "Waives future premiums on critical illness."}
        ],
        "last_updated": "2024-03-01",
        "source_url": "https://example.com/policies/family-income-shield"
    },
    {
        "title": "General Care Policy",
        "description": "General insurance plan for home, travel, and personal accident cover.",
        "category": "General Insurance",
        "effective_date": date(2024, 3, 10),
        "issuer": "CoverAll Insurance",
        "tags": ["general", "travel", "home"],
        "sections": [
            {"title": "Scope", "content": "Covers multiple non-life needs in one plan."},
            {"title": "Add-ons", "content": "Personal accident and critical illness riders available."}
        ],
        "last_updated": "2024-03-10",
        "source_url": "https://example.com/policies/general-care-policy"
    },
    {
        "title": "Secure Accident Guard",
        "description": "Personal accident coverage for injury, disability, and accidental death.",
        "category": "General Insurance",
        "effective_date": date(2024, 4, 15),
        "issuer": "GuardPlus",
        "tags": ["accident", "disability", "personal"],
        "sections": [
            {"title": "Coverage", "content": "Accidental death, permanent disability, and hospital cash."},
            {"title": "Support", "content": "24/7 claim assistance and cashless hospitals."}
        ],
        "last_updated": "2024-04-15",
        "source_url": "https://example.com/policies/secure-accident-guard"
    },
    {
        "title": "Auto Protect Premium",
        "description": "Car insurance with third-party liability, collision, and theft protection.",
        "category": "Car Insurance",
        "effective_date": date(2024, 4, 20),
        "issuer": "DriveSafe",
        "tags": ["car", "auto", "vehicle"],
        "sections": [
            {"title": "Coverage", "content": "Third-party liability, own-damage, and roadside assistance."},
            {"title": "Renewal", "content": "No-claim bonus benefits for safe drivers."}
        ],
        "last_updated": "2024-04-20",
        "source_url": "https://example.com/policies/auto-protect-premium"
    },
    {
        "title": "City Drive Secure",
        "description": "Affordable car insurance for city drivers with theft and damage cover.",
        "category": "Car Insurance",
        "effective_date": date(2024, 5, 12),
        "issuer": "UrbanDrive",
        "tags": ["car", "city", "urban"],
        "sections": [
            {"title": "Protection", "content": "Third-party, theft, and own-damage with personal accident."},
            {"title": "Benefits", "content": "Free roadside assistance and towing aid."}
        ],
        "last_updated": "2024-05-12",
        "source_url": "https://example.com/policies/city-drive-secure"
    },
    {
        "title": "Two-Wheeler Care",
        "description": "Two wheeler insurance for bikes and scooters with accident and theft cover.",
        "category": "Two Wheeler Insurance",
        "effective_date": date(2024, 2, 12),
        "issuer": "RideGuard",
        "tags": ["bike", "scooter", "two-wheeler"],
        "sections": [
            {"title": "Protection", "content": "Accidental damage, theft, and third-party liability."},
            {"title": "Add-ons", "content": "Return to invoice and roadside assistance available."}
        ],
        "last_updated": "2024-02-12",
        "source_url": "https://example.com/policies/two-wheeler-care"
    },
    {
        "title": "Bike Shield Essential",
        "description": "Comprehensive bike insurance with liability and theft protection.",
        "category": "Two Wheeler Insurance",
        "effective_date": date(2024, 6, 1),
        "issuer": "MotoSafe",
        "tags": ["bike", "motorcycle", "two-wheeler"],
        "sections": [
            {"title": "Coverage", "content": "Third-party liability, own-damage, and theft cover."},
            {"title": "Optional", "content": "Personal accident and zero depreciation riders."}
        ],
        "last_updated": "2024-06-01",
        "source_url": "https://example.com/policies/bike-shield-essential"
    },
    {
        "title": "Travel Guard Plus",
        "description": "Travel insurance covering medical emergencies, trip cancellation, and baggage loss.",
        "category": "Travel Insurance",
        "effective_date": date(2024, 5, 5),
        "issuer": "TravelSafe",
        "tags": ["travel", "medical", "baggage"],
        "sections": [
            {"title": "Coverage", "content": "Emergency medical, trip delay, and luggage loss."},
            {"title": "Support", "content": "24/7 assistance while traveling abroad."}
        ],
        "last_updated": "2024-05-05",
        "source_url": "https://example.com/policies/travel-guard-plus"
    },
    {
        "title": "Weekend Trip Saver",
        "description": "Short-term travel insurance for domestic and international weekend trips.",
        "category": "Travel Insurance",
        "effective_date": date(2024, 5, 20),
        "issuer": "TripSecure",
        "tags": ["travel", "short-term", "emergency"],
        "sections": [
            {"title": "Cover", "content": "Medical emergencies, trip cancellation, and lost baggage."},
            {"title": "Claims", "content": "Quick online claims within 24 hours."}
        ],
        "last_updated": "2024-05-20",
        "source_url": "https://example.com/policies/weekend-trip-saver"
    },
    {
        "title": "Home Secure Policy",
        "description": "Home insurance for fire, theft, and natural disaster damage.",
        "category": "Home Insurance",
        "effective_date": date(2024, 5, 20),
        "issuer": "HomeShield",
        "tags": ["home", "property", "natural disaster"],
        "sections": [
            {"title": "Protection", "content": "Structural damage, contents, and flood cover."},
            {"title": "Claims", "content": "Fast claim settlement with online support."}
        ],
        "last_updated": "2024-05-20",
        "source_url": "https://example.com/policies/home-secure-policy"
    },
    {
        "title": "Owner's Property Shield",
        "description": "Property insurance for homeowners against fire, burglary, and water damage.",
        "category": "Home Insurance",
        "effective_date": date(2024, 6, 10),
        "issuer": "PropertyGuard",
        "tags": ["home", "fire", "burglary"],
        "sections": [
            {"title": "Coverage", "content": "Fire, theft, and water damage for the home and contents."},
            {"title": "Service", "content": "Emergency repairs and claim assistance."}
        ],
        "last_updated": "2024-06-10",
        "source_url": "https://example.com/policies/owners-property-shield"
    }
]


def run():
    with engine.begin() as conn:
        SQLModel.metadata.drop_all(conn)
        SQLModel.metadata.create_all(conn)

    with Session(engine) as session:
        for item in SAMPLE:
            p = Policy(**item)
            session.add(p)
        session.commit()
    print("Seeded sample policies.")


if __name__ == "__main__":
    run()
