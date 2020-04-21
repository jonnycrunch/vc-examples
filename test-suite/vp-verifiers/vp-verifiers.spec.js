const fixtures = require("../__fixtures__");
const {
  postJson,
  writeVerifiablePresentationVerificationToDisc,
} = fixtures.helpers;

describe("vp-verifiers", () => {
  fixtures.vpVerifiers.forEach((verifier) => {
    describe(verifier, () => {
      fixtures.verifiablePresentations.forEach((verifiablePresentation) => {
        it(
          "should verify " +
            verifiablePresentation.verifiableCredential[0].type[1],
          async () => {
            const verificaton = await postJson(verifier, {
              verifiablePresentation,
              options: {
                checks: ["proof"],
                domain: verifiablePresentation.proof.domain,
                challenge: verifiablePresentation.proof.challenge,
              },
            });
            expect(verificaton.checks).toEqual(["proof"]);
            writeVerifiablePresentationVerificationToDisc(
              verifier.split("/")[2] +
                "--" +
                verifiablePresentation.verifiableCredential[0].type[1] +
                ".json",
              verificaton
            );
          }
        );
      });
    });
  });
});
