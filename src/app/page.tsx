import ExpandableCardDemo from "@/components/expandable-card-demo-standard"
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-10">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-full p-2">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Postcode</span>
            <div className="h-1 w-12 bg-blue-600"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-transparent border border-white/20 rounded-full p-2">
              <Trash2 className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Waste Type</span>
            <div className="h-1 w-12 bg-white/20"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-full p-2">
              <Truck className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Select Skip</span>
            <div className="h-1 w-12 bg-white/20"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-transparent border border-white/20 rounded-full p-2">
              <Shield className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Permit Check</span>
            <div className="h-1 w-12 bg-white/20"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-transparent border border-white/20 rounded-full p-2">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Choose Date</span>
            <div className="h-1 w-12 bg-white/20"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-transparent border border-white/20 rounded-full p-2">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">Payment</span>
          </div>
        </div>
      </div>

      <ExpandableCardDemo />
    </div>

  )

}
