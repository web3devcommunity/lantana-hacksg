import { asCause } from "@/components/CauseCard";
import { Cause, CauseInput } from "./cause";
import { CauseAttestation } from "./cause-attestation";
import { TEST_USERS_RAW } from "./user.fixture";
import _ from "lodash";

export const TEST_CAUSE_ATTESTATION_RAW: CauseAttestation[] = [
  {
    user: TEST_USERS_RAW[0],
  comment: 'Most successful beach clean up in Singapore',
  isProfessional: true

},
{
  user: TEST_USERS_RAW[1],
  comment: 'this area is what not currently covered by other programmes',
  isProfessional: true
}
]

console.log('TEST_USERS_RAW', TEST_USERS_RAW)
_.range(0, 20).forEach((i)=>{
  TEST_CAUSE_ATTESTATION_RAW.push(
    {
      user: TEST_USERS_RAW[i],
      comment: 'nice',
      isProfessional: false
    }
  )
});