from deepeval import assert_test
from deepeval.test_case import LLMTestCase
from deepeval.metrics import (
    AnswerRelevancyMetric,
    FaithfulnessMetric,
    ContextualRelevancyMetric,
    ContextualRecallMetric,
    ContextualPrecisionMetric
)

# Metrics with thresholds (if applicable)
answer_relevancy_metric = AnswerRelevancyMetric(threshold=0.5)
faithfulness_metric = FaithfulnessMetric()
contextual_relevancy_metric = ContextualRelevancyMetric()
contextual_recall_metric = ContextualRecallMetric()
contextual_precision_metric = ContextualPrecisionMetric()

# Define 15 test cases
test_cases = [
      LLMTestCase(
        input="What is Fail-safe default?",
        actual_output="Fail-safe default means access decisions should be based on permission rather than exclusion. That is, the default situation is lack of access, and the protection scheme identifies conditions under which access is permitted. This approach exhibits a better failure mode than the alternative approach, where the default is to per mit access. A design or implementation mistake in a mechanism that gives explicit permission tends to fail by refusing permission, a safe situation that can be quickly detected. On the other hand, a design or implementation mistake in a mechanism that explicitly excludes access tends to fail by allowing access, a failure that may long go unnoticed in normal use. For example, most file access systems work on this principle and virtually all protected services on client/server systems work this way.",
        expected_output="Fail-safe default means access decisions should be based on permission rather than exclusion. The default situation is no access unless explicitly permitted. This principle ensures that design or implementation errors tend to fail safely by denying access rather than inadvertently granting it.",
        retrieval_context=["Fail-safe default means that the system's default setting is to prevent access or action unless explicitly allowed. In other words, the default is no access, and you have to grant permission for something to happen. This is in contrast to a system where the default is to allow access and you need to explicitly deny it."]
    ),
    LLMTestCase(
        input="What is Economy of mechanism?",
        actual_output="means the design of security measures embodied in both hardware and software should be as simple and small as possible. The motiva tion for this principle is that relatively simple, small design is easier to test and verify thoroughly. With a complex design, there are many more opportunities for an adver sary to discover subtle weaknesses to exploit that may be difficult to spot ahead of time. The more complex the mechanism is, the more likely it is to possess exploitable flaws. Simple mechanisms tend to have fewer exploitable flaws and require less maintenance. Furthermore, because configuration management issues are simpli fied, updating or replacing a simple mechanism becomes a less intensive process. In practice, this is perhaps the most difficult principle to honor. There is a constant demand for new features in both hardware and software, complicating the security design task. The best that can be done is to keep this principle in mind during system design to try to eliminate unnecessary complexity.",
        expected_output="Economy of mechanism advocates for designing security measures to be simple and minimal. Simpler designs are easier to test and verify, reducing the chances of exploitable flaws while making updates and maintenance more straightforward.",
        retrieval_context=["Economy of mechanism means designing security measures (in both hardware and software) to be as simple and small as possible. The reasoning is that simpler designs are easier to test for vulnerabilities and less likely to have hidden flaws that attackers could exploit. Complex systems have more opportunities for errors."]
    ),
    LLMTestCase(
        input="What is Complete mediation?",
        actual_output="means every access must be checked against the access control mechanism. Systems should not rely on access decisions retrieved from a cache. In a system designed to operate continuously, this principle requires that, if access decisions are remembered for future use, careful consideration be given to how changes in authority are propagated into such local memories. File access systems appear to provide an example of a system that complies with this principle. However, typically, once a user has opened a file, no check is made to see of permissions change. To fully implement complete mediation, every time a user reads a field or record in a file, or a data item in a database, the system must exercise access control. This resource-intensive approach is rarely used.",
        expected_output="Complete mediation requires that every access attempt to a resource be verified by the access control mechanism, rather than relying on cached decisions. This ensures that access policies remain accurate and up-to-date.",
        retrieval_context=["Complete mediation means that every access attempt to a resource must be checked against the access control mechanism. The system cannot rely on cached or pre-determined access decisions; every request needs to be verified in real-time. This ensures that access controls are up-to-date and accurate."]
    ),
    LLMTestCase(
        input="What is Open design?",
        actual_output="Open design means the design of a security mechanism should be open rather than secret. For example, although encryption keys must be secret, encryption algorithms should be open to public scrutiny. The algorithms can then be reviewed by many experts, and users can therefore have high confidence in them. This is the philosophy behind the National Institute of Standards and Technology (NIST) pro gram of standardizing encryption and hash algorithms, and has led to the widespread adoption of NIST-approved algorithms.",
        expected_output="Open design means that security mechanisms should not rely on secrecy for their effectiveness. For example, encryption algorithms should be publicly scrutinized to ensure robustness, while only the keys need to remain confidential.",
        retrieval_context=["Open design in security means the design of a security mechanism should be public, not secret. Encryption algorithms, for example, should be open to scrutiny, allowing experts to review them and users to have greater confidence in their security. This is in contrast to keeping the design secret, which can hide vulnerabilities."]
    ),
    LLMTestCase(
        input="What is Least privilege?",
        actual_output="Least privilege means every process and every user of the system should operate using the least set of privileges necessary to perform the task. A good example of the use of this principle is role-based access control, as will be described in Chapter 4. The system security policy can identify and define the various roles of users or processes. Each role is assigned only those permissions needed to perform its functions. Each permission specifies a permitted access to a particular resource (such as read and write access to a specified file or directory, and connect access to a given host and port). Unless permission is granted explicitly, the user or process should not be able to access the protected resource. More generally, any access control system should allow each user only the privileges that are authorized for that user. There is also a temporal aspect to the least privilege principle. For example, system programs or administrators who have special privileges should have those privileges only when necessary; when they are doing ordinary activities the privileges should be withdrawn. Leaving them in place just opens the door to accidents.",
        expected_output="Least privilege means that processes and users should only have the minimum privileges needed to complete their tasks. This can be applied through role-based access control where roles are assigned only necessary permissions. Permissions should be revoked when no longer needed to minimize risk.",
        retrieval_context=["Least privilege is a security concept that programs and users should be granted only the minimum necessary permissions to perform their tasks. This limits the damage potential if a system or program is compromised."]
    ),
    LLMTestCase(
        input="What Psychological acceptability?",
        actual_output="Psychological acceptability implies the security mechanisms should not interfere unduly with the work of users, and at the same time meet the needs of those who authorize access. If security mechanisms hinder the usability or accessibility of resources, users may opt to turn off those mechanisms. Where possible, security mechanisms should be transparent to the users of the system or at most introduce minimal obstruction. In addition to not being intrusive or burdensome, security procedures must reflect the user’s mental model of protection. If the protection procedures do not make sense to the user or if the user, must translate his or her image of protection into a substantially different protocol, the user is likely to make errors.",
        expected_output="Psychological acceptability means that security mechanisms should not disrupt users' tasks and should align with their expectations. If they are intrusive or confusing, users may disable them, undermining security. Mechanisms should be easy to understand and use.",
        retrieval_context=["Psychological acceptability in security design means security mechanisms should not significantly interfere with users' work. They should be transparent or minimally obstructive, and the procedures should align with users' mental models of protection. If security measures are confusing or burdensome, users might disable them, defeating the purpose."]
    ),
    LLMTestCase(
        input="What is Encapsulation?",
        actual_output="Encapsulation can be viewed as a specific form of isolation based on object oriented functionality. Protection is provided by encapsulating a collection of procedures and data objects in a domain of its own so that the internal structure of a data object is accessible only to the procedures of the protected subsystem and the procedures may be called only at designated domain entry points.",
        expected_output="Encapsulation is a way of isolating a group of procedures and data within a specific domain, protecting them so that only designated entry points can access them. This limits interaction to controlled points and hides internal structures from unauthorized access.",
        retrieval_context=["Encapsulation, in a security context, is a way to protect data and procedures by bundling them together within a specific domain. The internal workings of the data and procedures are hidden from outside access, and interaction is limited to designated entry points. This protects the internal structure from unauthorized modification."]
    ),
    LLMTestCase(
        input="What is Least astonishment?",
        actual_output="Least astonishment means a program or user interface should always respond in the way that is least likely to astonish the user. For example, the mechanism for authorization should be transparent enough to a user that the user has a good intuitive understanding of how the security goals map to the provided security mechanism.",
        expected_output="Least astonishment is a design principle stating that programs or user interfaces should act in a way that aligns with user expectations to avoid surprise or confusion. The goal is to ensure interfaces are intuitive and predictable.",
        retrieval_context=["Least astonishment is a principle in user interface design. A program or user interface should always respond in the way that is least likely to surprise or confuse the user. This means the design should be intuitive and predictable."]
    ),
    LLMTestCase(
        input="What is the result of 2 * 4?",
        actual_output="the result is 8.",
        expected_output="The result of 2 * 4 is 8.",
        retrieval_context=["2 * 4 = 8"]
    ),
    LLMTestCase(
        input="multiply the above result by 3",
        actual_output="the result is 24",
        expected_output="Multiplying the previous result by 3 gives 24.",
        retrieval_context=["8 * 3 = 24"]
    ),
    LLMTestCase(
        input="What is Human attack surface?",
        actual_output="This category refers to vulnerabilities created by personnel or outsiders, such as social engineering, human error, and trusted insiders.",
        expected_output="A human attack surface refers to vulnerabilities caused by personnel or outsiders, including social engineering, human error, and trusted insiders.",
        retrieval_context=["A human attack surface refers to vulnerabilities created by personnel or outsiders, such as social engineering, human error, and trusted insiders."]
    ),
    LLMTestCase(
        input="What is Software attack surface?",
        actual_output="This refers to vulnerabilities in application, utility, or operating system code. A particular focus in this category is Web server software.",
        expected_output="A software attack surface refers to vulnerabilities in application, utility, or operating system code, with a particular focus on web server software.",
        retrieval_context=["A software attack surface refers to vulnerabilities in application, utility, or operating system code. A key focus is often on vulnerabilities in web server software."]
    ),
    LLMTestCase(
        input="What Network attack surface?",
        actual_output="This category refers to vulnerabilities over an enterprise network, wide-area network, or the Internet. Included in this category are network protocol vulnerabilities, such as those used for a denial-of-service attack, disruption of communications links, and various forms of intruder attacks.",
        expected_output="A network attack surface refers to vulnerabilities in an enterprise network, wide-area network, or the Internet. It includes network protocol vulnerabilities like those used for denial-of-service attacks, disruptions of communication links, and other forms of intruder attacks.",
        retrieval_context=["A network attack surface refers to vulnerabilities over an enterprise network, wide-area network, or the internet. This includes network protocol vulnerabilities, such as those used for denial-of-service attacks, disruption of communications links, and various forms of intruder attacks."]
    ),
    LLMTestCase(
        input="What is Injection of commands?",
        actual_output="In this type of attack, the attacker is able to intercept communication between the UT and the IBS. Various schemes can be used to be able to impersonate the valid user and so gain access to the banking system.",
        expected_output="Command injection is a type of attack where the attacker intercepts communication, often using schemes to impersonate the valid user and gain unauthorized access to systems like banking systems.",
        retrieval_context=["Injection of commands is a type of security vulnerability where an attacker can inject malicious commands into a system, causing it to execute unintended actions. This typically occurs when user input is not properly sanitized and is directly used in a command or query."]
    )
]

# Run and evaluate all test cases
def test_answer_relevancy():
    results = []
    for i, test_case in enumerate(test_cases):
        # Evaluate with all metrics
        result = assert_test(
            test_case,
            [
                answer_relevancy_metric,
                faithfulness_metric,
                contextual_relevancy_metric,
                contextual_recall_metric,
                contextual_precision_metric
            ]
        )
        results.append((i + 1, result))  # Store the result with a test case number
    return results

# Print results of all test cases
if __name__ == "__main__":
    test_results = test_answer_relevancy()
    for test_num, result in test_results:
        print(f"Test Case {test_num}: {result}")