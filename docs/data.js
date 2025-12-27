/* Steps, commands, checklists, and troubleshooting for the GUI app */
window.LAB_DATA = [
  {
    id: "intro",
    section: "Introduction",
    title: "Introduction to Network Risk Assessment with Nessus Essentials",
    intro: "This project demonstrates the use of Nessus Essentials for performing network risk assessments. It includes setting up, scanning vulnerabilities, and analyzing results using virtual machines like Metasploitable and Windows 11.",
    image: "assets/cover.png",
    caption: "Risk Assessment with Nessus Essentials",
    checklist: [
      "Understand Nessus Essentials as a vulnerability scanning tool.",
      "Recognize key components of vulnerability scanning: targets, plugins, and severity levels.",
      "Configure, run, and analyze Nessus scans for real-world network risk assessment."
    ],
    commands: [],
    notes: [
      "Nessus Essentials is widely used for identifying, prioritizing, and remediating vulnerabilities.",
      "This process simulates a hands-on vulnerability scan on common systems."
    ],
    issues: []
  },
  {
    id: "reqs-system",
    section: "Project Requisites",
    title: "System Requirements",
    intro: "This lab requires a physical machine with 16 GB RAM and 256 GB storage to efficiently run the virtual machines for Nessus scanning.",
    image: "assets/reqs-system.png",
    caption: "System Requirements for Nessus Essentials Lab",
    checklist: [
      "Physical host with at least 16 GB of RAM.",
      "At least 256 GB of storage, SSD preferred for better performance."
    ],
    commands: [],
    notes: [
      "These system specs ensure smooth operation of multiple VMs and proper vulnerability scanning.",
      "Stable hardware and adequate resources are essential for accurate and consistent results."
    ],
    issues: []
  },
  {
    id: "reqs-software",
    section: "Project Requisites",
    title: "Software Requirements",
    intro: "VMware Workstation Pro was used to run the virtual machines (VMs), including Windows 11 and Metasploitable, which are scanned using Nessus Essentials.",
    image: "assets/reqs-software.png",
    caption: "Software Requirements for Nessus Essentials Lab",
    checklist: [
      "VMware Workstation Pro installed.",
      "Windows 11 VM (target) created.",
      "Metasploitable VM (vulnerable target) created."
    ],
    commands: [],
    notes: [
      "VMware allows the creation of isolated VMs for scanning and vulnerability analysis.",
      "Ensure VMs are running before initiating scans for accurate results."
    ],
    issues: []
  },
  {
    id: "method",
    section: "Methodology",
    title: "Methodology Phases",
    intro: "The methodology consists of three phases: Setup, Scanning, and Analysis.",
    image: "assets/methodology.png",
    caption: "Structured Approach for Vulnerability Scanning",
    checklist: [
      "Set up the environment with necessary software.",
      "Run Nessus vulnerability scans on target systems.",
      "Analyze scan results, prioritize vulnerabilities, and recommend fixes."
    ],
    commands: [],
    notes: [
      "A phased approach ensures systematic execution of tasks and comprehensive analysis of results."
    ],
    issues: []
  },
  {
    id: "env",
    section: "Setup",
    title: "Setting Up Virtual Machines and Networking",
    intro: "VMware Workstation Pro is used to create the VMs. Networking is set to 'Bridged' mode to ensure that each VM gets an individual IP address from the local network.",
    image: "assets/step-1.png",
    caption: "VM Setup for Nessus Scanning",
    checklist: [
      "Install VMware Workstation Pro.",
      "Create Ubuntu and Windows 11 VMs.",
      "Set all VMs to 'Bridged' networking mode.",
      "Check connectivity between all VMs."
    ],
    commands: [
      { title: "Check IP and connectivity (Linux)", code: "ip a | grep inet\nping -c 3 <metasploitable_ip>\nping -c 3 <windows_ip>" },
      { title: "Check IP (Windows PowerShell)", code: "Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike \"169.*\"}" }
    ],
    notes: [
      "Bridged mode ensures each VM is treated as an individual device on the network, important for vulnerability scanning."
    ],
    issues: [
      {
        title: "VMs cannot communicate",
        severity: "Network",
        body: [
          "If VMs are not assigned correct IPs or cannot ping each other, check the network adapter settings."
        ],
        fixes: [
          { label: "Switch to Bridged networking", code: "In VMware, change the network adapter to Bridged and recheck IPs using the above commands." }
        ]
      }
    ]
  },
  {
    id: "install",
    section: "Setup",
    title: "Installing Nessus Essentials",
    intro: "The Nessus Essentials installation script is used on Ubuntu to install Nessus and related services for scanning.",
    image: "assets/step-2.png",
    caption: "Successful Nessus Essentials Installation",
    checklist: [
      "Update the Ubuntu system.",
      "Install curl if missing.",
      "Run the Nessus Essentials installation script."
    ],
    commands: [
      { title: "Install curl", code: "sudo apt install curl" },
      { title: "Install Nessus Essentials", code: "curl -sO https://www.tenable.com/downloads/api/v1/public/pages/nessus/download?i_am_a_human=1\nsudo dpkg -i Nessus-<version>.deb" }
    ],
    notes: [
      "Ensure the necessary software is installed for Nessus Essentials to function correctly."
    ],
    issues: [
      {
        title: "Missing curl",
        severity: "Install",
        body: [
          "curl is necessary to download Nessus Essentials."
        ],
        fixes: [
          { label: "Install curl", code: "sudo apt install curl" }
        ]
      }
    ]
  },
  {
    id: "dashboard",
    section: "Setup",
    title: "Accessing the Nessus Dashboard",
    intro: "The Nessus Essentials dashboard can be accessed by logging into the web interface with credentials generated during installation.",
    image: "assets/step-3.png",
    caption: "Nessus Dashboard Access",
    checklist: [
      "Ensure Nessus service is running.",
      "Login to the dashboard via the browser using the server's IP or localhost."
    ],
    commands: [
      { title: "Access dashboard", code: "http://<your_ip>:8834" }
    ],
    notes: [
      "The dashboard is used to configure scans and analyze results."
    ],
    issues: [
      {
        title: "Cannot access dashboard",
        severity: "Access",
        body: [
          "Ensure the correct URL is used and that the firewall is configured to allow access."
        ],
        fixes: [
          { label: "Check URL", code: "http://<your_ip>:8834" },
          { label: "Allow firewall ports", code: "sudo ufw allow 8834/tcp" }
        ]
      }
    ]
  },
  {
    id: "scanning",
    section: "Scanning",
    title: "Running Vulnerability Scans",
    intro: "With Nessus configured, a vulnerability scan can be set up by entering the IP addresses of the target VMs (Metasploitable and Windows 11).",
    image: "assets/step-4.png",
    caption: "Running a Vulnerability Scan in Nessus Essentials",
    checklist: [
      "Create a new scan and set the target IP addresses.",
      "Customize the scan settings according to the environment.",
      "Start the scan and wait for the results."
    ],
    commands: [],
    notes: [
      "Nessus provides detailed results based on the scan configurations."
    ],
    issues: []
  },
  {
    id: "report",
    section: "Analysis",
    title: "Analyzing Scan Results",
    intro: "Once the scan completes, the results can be analyzed to prioritize vulnerabilities by severity and impact.",
    image: "assets/step-5-analysis.png",
    caption: "Analyzing Scan Results in Nessus Essentials",
    checklist: [
      "Review scan results and severity levels (Critical, High, Medium, Low).",
      "Prioritize remediation based on the severity and impact of vulnerabilities."
    ],
    commands: [],
    notes: [
      "The results help in understanding vulnerabilities and deciding which ones to fix first."
    ],
    issues: []
  },
  {
    id: "remediation",
    section: "Remediation",
    title: "Generating Reports and Remediation Recommendations",
    intro: "After analyzing the results, a report can be generated to summarize the findings and provide actionable remediation strategies.",
    image: "assets/step-6-remediation.png",
    caption: "Generating Remediation Reports from Nessus",
    checklist: [
      "Generate a PDF/HTML report.",
      "Provide remediation steps for critical vulnerabilities."
    ],
    commands: [],
    notes: [
      "Detailed remediation suggestions are provided based on the vulnerability severity and system configuration."
    ],
    issues: []
  },
  {
    id: "conclusion",
    section: "Conclusion",
    title: "Conclusion and Findings",
    intro: "The successful use of Nessus Essentials demonstrated how vulnerabilities can be identified, prioritized, and addressed to improve network security.",
    checklist: [
      "Scan completed successfully.",
      "Critical vulnerabilities identified.",
      "Remediation strategies proposed."
    ],
    commands: [],
    notes: [
      "Regular vulnerability assessments and remediation are essential to maintaining secure systems."
    ],
    issues: []
  }
];
